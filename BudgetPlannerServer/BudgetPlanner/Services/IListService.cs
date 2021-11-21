using BudgetPlanner.DTO.Lists;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetPlanner.Services
{
    public interface IListService
    {
        Task<List<ListWithTimestampsDto>> GetCreated(); 
        
        Task<List<ListWithTimestampsDto>> GetShared();

        Task<ListWithTimestampsDto?> Create(ListForCreateDto listToAdd);
    }
}
