using BudgetPlanner.Context;
using BudgetPlanner.DTO;
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

        public async Task<ListWithTimestampsDto?> Create(ListForEditDto listToAdd)
        {
            var list = new List { Name = listToAdd.Name };
            await _context.Lists.AddAsync(list);
            await _context.SaveChangesAsync();

            var listUsers = await MapUserWithTypeToListUsers(listToAdd.Users, list.Id);
            if (listUsers == null)
                return null;

            await _context.ListUsers.AddRangeAsync(listUsers);
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

        private async Task<IEnumerable<ListUser>?> MapUserWithTypeToListUsers(List<UserWithTypeDto> usersWithType, Guid listId)
        {
            var userId = _httpContextAccessor.GetUserId();
            if (userId == null)
                return null;

            await _context.ListUsers.AddAsync(new ListUser
            {
                ListId = listId,
                UserId = userId,
                ListUserType = ListUserType.Owner
            });

            var mapListUsersTask = usersWithType.Select(async (user) => new ListUser
            {
                ListId = listId,
                UserId = await _userManager.GetUserIdAsync(user.Email) ?? "",
                ListUserType = user.Type
            });
            var mappedListUsers = await Task.WhenAll(mapListUsersTask);

            return mappedListUsers.Where(listUser =>
                !string.IsNullOrWhiteSpace(listUser.UserId));
        }
    }
}
