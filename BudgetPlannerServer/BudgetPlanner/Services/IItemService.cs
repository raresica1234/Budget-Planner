using System.Threading.Tasks;
using BudgetPlanner.DTO;

namespace BudgetPlanner.Services
{
    public interface IItemService
    { 
        Task<ItemDetailsDto> AddAsync(ItemDetailsDto itemDto);
        Task<ItemDetailsDto> UpdateAsync(ItemDto itemUpdateDto);
    }
}