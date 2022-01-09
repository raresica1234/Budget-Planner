using System;
using System.Threading.Tasks;
using BudgetPlanner.DTO.Items;

namespace BudgetPlanner.Services
{
    public interface IItemService
    { 
        Task<ItemDetailsDto> AddAsync(ItemCreateDto itemCreateDto);

        Task<ItemDetailsDto?> UpdateAsync(ItemUpdateDto itemUpdateDto);

        Task<bool> DeleteAsync(Guid itemId);
    }
}