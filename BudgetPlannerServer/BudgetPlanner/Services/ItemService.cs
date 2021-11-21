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
        
        public async Task<ItemDetailsDto> AddAsync(ItemDto itemDto)
        {
            var item = new Item
            {
                Name = itemDto.Name,
                List = _context.Lists.First(list => list.Id == itemDto.ListId),
                Price = itemDto.Price,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            
            await _context.Items.AddAsync(item);
            
            var result = await _context.SaveChangesAsync();

            if (result == 0) 
                return null;
            
            return new ItemDetailsDto
            {
                Name = item.Name,
                Price = item.Price,
                CreatedAt = item.CreatedAt,
                UpdatedAt = item.UpdatedAt
            };
        }
        
        public async Task<ItemDetailsDto> UpdateAsync(ItemUpdateDto itemUpdateDto)
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
                CreatedAt = initialItem.CreatedAt,
                UpdatedAt = initialItem.UpdatedAt
            };
            
            return itemDetailsDto;
        }
    }
}