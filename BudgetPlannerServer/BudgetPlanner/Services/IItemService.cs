using System.Threading.Tasks;
using BudgetPlanner.DTO;

namespace BudgetPlanner.Services
{
    public interface IItemService
    { 
        Task<ItemDetailsDto> AddAsync(ItemCreateDto itemCreateDto);
        
        Task<ItemDetailsDto> UpdateAsync(ItemUpdateDto itemUpdateDto);
    }
}