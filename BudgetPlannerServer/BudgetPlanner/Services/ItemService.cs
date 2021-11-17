using System.Linq;
using BudgetPlanner.Context;
using BudgetPlanner.DTO;
using BudgetPlanner.Extensions;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.Services
{
    public class ItemService : IItemService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ItemDetailsDto Update(ItemDto itemUpdateDto)
        {
            var itemUpdate = new Item
            {
                Id = itemUpdateDto.Id,
                Name = itemUpdateDto.Name,
                Price = itemUpdateDto.Price,
                List = itemUpdateDto.List
            };
            
            var initialItem = _context.Items
                .Where(item => item.Id == itemUpdate.Id)
                .AsNoTracking()
                .FirstOrDefault();
            
            var listForItem = _context.Lists
                .Where(list => list.Id == itemUpdate.List.Id)
                .AsNoTracking()
                .FirstOrDefault();
            
            var userForList = _context.Users
                .Where(user => user.Id == _httpContextAccessor.GetUserId().ToString())
                .AsNoTracking()
                .FirstOrDefault();
            
            if (initialItem == null || listForItem == null || userForList == null)
                return null;

            _context.Items.Update(itemUpdate);
            _context.SaveChanges();

            var itemDetailsDto = new ItemDetailsDto
            {
                Id = itemUpdate.Id,
                Name = itemUpdate.Name,
                Price = itemUpdate.Price,
                List = itemUpdate.List,
                CreatedAt = itemUpdate.CreatedAt,
                UpdatedAt = itemUpdate.UpdatedAt
            };
            
            return itemDetailsDto;
        }
    }
}