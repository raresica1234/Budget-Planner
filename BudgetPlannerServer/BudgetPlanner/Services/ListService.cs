using BudgetPlanner.Context;
using BudgetPlanner.DTO;
using BudgetPlanner.DTO.Items;
using BudgetPlanner.DTO.Lists;
using BudgetPlanner.Extensions;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetPlanner.Services
{
    public class ListService : IListService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public ListService(DataContext context, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public Task<List<ListWithTimestampsDto>> GetCreated(string searchKeyword)
        {
            return GetListsForUser(true, searchKeyword);
        }
        
        public Task<List<ListWithTimestampsDto>> GetShared(string searchKeyword)
        {
            return GetListsForUser(false, searchKeyword);
        }

        public async Task<ListWithTimestampsDto?> Create(ListForCreateDto listToAdd)
        {
            var now = DateTime.Now;

            var list = new List
            {
                Name = listToAdd.Name,
                CreatedAt = now,
                UpdatedAt = now
            };
            await _context.Lists.AddAsync(list);
            await _context.SaveChangesAsync();

            var userId = _httpContextAccessor.GetUserId();
            if (userId == null)
                return null;

            await _context.ListUsers.AddAsync(new ListUser
            {
                ListId = list.Id,
                UserId = userId,
                ListUserType = ListUserType.Owner
            });
            
            var listUsers = await MapUserWithTypeToListUsers(listToAdd.Users, list.Id, userId);

            await _context.ListUsers.AddRangeAsync(listUsers);
            await _context.SaveChangesAsync();

            return new ListWithTimestampsDto(list);
        }

        public async Task<ListWithTimestampsDto?> Update(ListForUpdateDto listForUpdate)
        {
            var userId = _httpContextAccessor.GetUserId();

            if (userId == null)
            {
                return null;
            }

            var list = await _context.Lists.FindAsync(listForUpdate.Id);

            if (list == null)
            {
                return null;
            }

            var currentUserListUser = await _context.ListUsers.FindAsync(userId, listForUpdate.Id);

            if (currentUserListUser is not {ListUserType: ListUserType.Owner})
            {
                return null;
            }

            var currentListUsers = await _context.ListUsers
                .Where(listUser => listUser.ListId == list.Id && listUser.UserId != userId)
                .ToListAsync();
            var newListUsers = await MapUserWithTypeToListUsers(listForUpdate.Users, list.Id, userId);

            // ListUsers from the new list having a UserId that currently does not exist or have a new type
            var listUsersToAdd = newListUsers.Where(newListUser =>
                currentListUsers.All(currentListUser => newListUser.UserId != currentListUser.UserId ||
                                                        newListUser.ListUserType != currentListUser.ListUserType));
            // ListUsers from the current list having a UserId that does not exist in the new list or have a different type in the new list
            var listUsersToRemove = currentListUsers.Where(currentListUser =>
                newListUsers.All(newListUser =>
                    newListUser.UserId != currentListUser.UserId ||
                    newListUser.ListUserType != currentListUser.ListUserType));

            _context.ListUsers.RemoveRange(listUsersToRemove);
            await _context.ListUsers.AddRangeAsync(listUsersToAdd);

            list.Name = listForUpdate.Name;
            list.UpdatedAt = DateTime.Now;
            _context.Lists.Update(list);

            await _context.SaveChangesAsync();

            return new ListWithTimestampsDto(list);
        }

        private Task<List<ListWithTimestampsDto>> GetListsForUser(bool isOwner, string searchKeyword)
        {
            var userId = _httpContextAccessor.GetUserId();
            var lowerKeyword = searchKeyword.ToLower();

            return _context.Lists.Where(list =>
                list.ListUsers.Any(listUser =>
                    listUser.UserId == userId && listUser.ListUserType == ListUserType.Owner == isOwner) &&
                    list.Name.ToLower().Contains(lowerKeyword))
                .Select(list => new ListWithTimestampsDto(list))
                .ToListAsync();
        }

        private async Task<List<ListUser>> MapUserWithTypeToListUsers(List<UserWithTypeDto> usersWithType, Guid listId, string currentUserId)
        {
            var mappedListUsers = new List<ListUser>();
            
            foreach (var user in usersWithType)
            {
                var userId = await _userManager.GetUserIdAsync(user.Email);

                if (userId == null || userId == currentUserId)
                {
                    continue;
                }
                
                mappedListUsers.Add(new ListUser
                {
                    ListId = listId,
                    UserId = userId,
                    ListUserType = user.Type
                });
            }

            return mappedListUsers;
        }

        public async Task<ListDetailsDto?> GetDetails(Guid listId)
        {
            var userId = _httpContextAccessor.GetUserId();
            if (userId == null)
                return null;

            var list = _context.Lists.FirstOrDefault(list => list.Id == listId);
            if (list == null)
                return null;

            var userDtos = await _context.ListUsers.Where(listUser => listUser.ListId == listId)
                .Select(listUser => new SimpleUserDto(listUser.User))
                .ToListAsync();

            if (!userDtos.Exists(user => user.Id == userId))
                return null;

            var itemDtos = await _context.Items.Where(item => item.List.Id == listId)
                .Select(item => new ItemDetailsDto(item))
                .ToListAsync();

            var sum = itemDtos.Sum(item => item.Price);

            return new ListDetailsDto(list.Name, itemDtos, sum, userDtos);
        }

        public async Task<UsersForListDTO?> GetUsers(Guid listId)
        {
            var userId = _httpContextAccessor.GetUserId();
            if (userId == null)
                return null;

            if (listId != Guid.Empty && !IsUserOwnerOfList(userId, listId))
                return null;

            var linkedUsers = listId == Guid.Empty ?
                new List<UserWithTypeDto>() :
                await _context.ListUsers
                    .Where(listUser => listUser.ListId == listId && listUser.UserId != userId)
                    .Include(listUser => listUser.User)
                    .Select(listUser => new UserWithTypeDto(listUser))
                    .ToListAsync();

            var linkedEmails = linkedUsers.Select(user => user.Email);

            var pastListConnections = await _context.ListUsers
                .Where(listUser => listUser.UserId == userId && listUser.ListId != listId)
                .Select(listUser => listUser.ListId)
                .ToListAsync();

            var relevantEmails = await _context.ListUsers.Where(listUser =>
                    listUser.UserId != userId &&
                    pastListConnections.Contains(listUser.ListId) &&
                    !linkedEmails.Contains(listUser.User.Email))
                .Select(listUser => listUser.User.Email)
                .Distinct()
                .ToListAsync();

            return new UsersForListDTO
            {
                LinkedUsers = linkedUsers,
                RelevantEmails = relevantEmails
            };
        }

        private bool IsUserOwnerOfList(string userId, Guid listId) => _context.ListUsers.Any(listUser =>
            listUser.UserId == userId &&
            listUser.ListId == listId &&
            listUser.ListUserType == ListUserType.Owner);
    }
}
