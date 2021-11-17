using BudgetPlanner.DTO;
using BudgetPlanner.Models;

namespace BudgetPlanner.Services
{
    public interface IItemService
    {
        ItemDetailsDto Update(ItemDto itemUpdateDto);
    }
}