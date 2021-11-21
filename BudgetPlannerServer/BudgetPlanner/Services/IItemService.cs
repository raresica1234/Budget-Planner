using System.Threading.Tasks;
using BudgetPlanner.DTO;

namespace BudgetPlanner.Services
{
    public interface IItemService
    { 
        Task<ItemDetailsDto> AddAsync(ItemDto itemDto);
        
        Task<ItemDetailsDto> UpdateAsync(ItemUpdateDto itemUpdateDto);
    }
}