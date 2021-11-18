using BudgetPlanner.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetPlanner.Services
{
    public interface IListService
    {
        Task<List<ListWithTimestampsDto>> GetCreated();

        Task<ListWithTimestampsDto?> Create(ListForEditDto listToAdd);
    }
}
