using System;
using System.Linq;
using System.Threading.Tasks;
using BudgetPlanner.Context;
using BudgetPlanner.DTO.Items;
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

        public async Task<ItemDetailsDto> AddAsync(ItemCreateDto itemCreateDto)
        {
            var now = DateTime.Now;
            var item = new Item
            {
                Name = itemCreateDto.Name,
                ListId = itemCreateDto.ListId,
                Price = itemCreateDto.Price,
                CreatedAt = now,
                UpdatedAt = now
            };
            
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();

            return new ItemDetailsDto(item);
        }
        
        public async Task<ItemDetailsDto?> UpdateAsync(ItemUpdateDto itemUpdateDto)
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

            return new ItemDetailsDto(initialItem);
        }

        public async Task<bool> DeleteAsync(Guid itemId)
        {
            var itemToDelete = _context.Items
                .FirstOrDefault(item => item.Id == itemId &&
                                        item.List.Users.Any(user => user.Id == _httpContextAccessor.GetUserId()));

            if (itemToDelete == null)
                return false;

            _context.Items.Remove(itemToDelete);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}