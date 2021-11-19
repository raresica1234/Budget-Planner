using System;
using System.Linq;
using System.Threading.Tasks;
using BudgetPlanner.Context;
using BudgetPlanner.DTO;
using BudgetPlanner.Extensions;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Http;

namespace BudgetPlanner.Services
{
    public class ItemService : IItemService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        public ItemService(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        
        public async Task<ItemDetailsDto> AddAsync(ItemDetailsDto itemDto)
        {
            Item item = new Item
            {
                Name = itemDto.Name,
                List = itemDto.List,
                Price = itemDto.Price,
                CreatedAt = itemDto.CreatedAt,
                UpdatedAt = itemDto.UpdatedAt
            };
            
            itemDto.Id = _context.Items.Add(item).Entity.Id;
            
            await _context.SaveChangesAsync();

            return itemDto;
        }
        
        public async Task<ItemDetailsDto> UpdateAsync(ItemDto itemUpdateDto)
        {
            var initialItem = _context.Items
                .FirstOrDefault(item => item.Id == itemUpdateDto.Id && 
                                        item.List.Users.Any(user => user.Id == _httpContextAccessor.GetUserId()));
            
            if (initialItem == null)
                return null;
            
            initialItem.Price = itemUpdateDto.Price;
            initialItem.Name = itemUpdateDto.Name;
            initialItem.UpdatedAt = DateTime.Now;

            _context.Items.Update(initialItem);
            await _context.SaveChangesAsync();
            
            var itemDetailsDto = new ItemDetailsDto
            {
                Id = initialItem.Id,
                Name = initialItem.Name,
                Price = initialItem.Price,
                List = initialItem.List,
                CreatedAt = initialItem.CreatedAt,
                UpdatedAt = initialItem.UpdatedAt
            };
            
            return itemDetailsDto;
        }
    }
}