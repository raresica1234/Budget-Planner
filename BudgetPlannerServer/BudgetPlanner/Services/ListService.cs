using BudgetPlanner.Context;
using BudgetPlanner.DTO;
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

        public Task<List<ListWithTimestampsDto>> GetCreated()
        {
            return GetListsForUser(true);
        }
        
        public Task<List<ListWithTimestampsDto>> GetShared()
        {
            return GetListsForUser(false);
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
            
            var listUsers = await MapUserWithTypeToListUsers(listToAdd.Users, list.Id);

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

            var currentListUsers = await _context.ListUsers
                .Where(listUser => listUser.ListId == list.Id && listUser.UserId != userId)
                .ToListAsync();
            var newListUsers = await MapUserWithTypeToListUsers(listForUpdate.Users, list.Id);

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

        private Task<List<ListWithTimestampsDto>> GetListsForUser(bool isOwner)
        {
            var userId = _httpContextAccessor.GetUserId();

            return _context.Lists.Where(list =>
                list.ListUsers.Any(listUser =>
                    listUser.UserId == userId && listUser.ListUserType == ListUserType.Owner == isOwner))
                .Select(list => new ListWithTimestampsDto(list))
                .ToListAsync();
        }

        private async Task<List<ListUser>> MapUserWithTypeToListUsers(List<UserWithTypeDto> usersWithType, Guid listId)
        {
            var mappedListUsers = new List<ListUser>();
            
            foreach (var user in usersWithType)
            {
                mappedListUsers.Add(new ListUser
                {
                    ListId = listId,
                    UserId = await _userManager.GetUserIdAsync(user.Email) ?? "",
                    ListUserType = user.Type
                });
            }

            return mappedListUsers;
        }

        public async Task<ListDetailsDto> GetDetails(Guid listId)
        {
            List<ItemUpdateDto> itemDtos = await _context.Items.Where(item => item.List.Id == listId)
                .Select(item => new ItemUpdateDto(item.Id, item.Name, item.Price))
                .ToListAsync();

            double sum = 0;
            itemDtos.ForEach(item => sum += item.Price);

            List<SimpleUserDto> userDtos = await _context.ListUsers.Where(listuser => listuser.ListId == listId)
                .Select(listUser => new SimpleUserDto(listUser.UserId, listUser.User.Email))
                .ToListAsync();

            return new ListDetailsDto(itemDtos, sum, userDtos);
        }
    }
}
