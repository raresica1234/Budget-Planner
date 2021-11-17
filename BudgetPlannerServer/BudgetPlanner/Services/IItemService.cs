using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Models;

namespace BudgetPlanner.Services
{
    public interface IItemService
    { 
        Task<ItemDetailsDto> UpdateAsync(ItemDto itemUpdateDto);
    }
}