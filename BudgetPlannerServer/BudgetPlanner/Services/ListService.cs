using BudgetPlanner.Context;
using BudgetPlanner.DTO;
using BudgetPlanner.Extensions;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetPlanner.Services
{
    public class ListService : IListService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ListService(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<List<ListWithTimestampsDto>> GetCreated()
        {
            return GetListsForUser(true);
        }

        public Task<List<ListWithTimestampsDto>> GetShared()
        {
            return GetListsForUser(false);
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
    }
}
