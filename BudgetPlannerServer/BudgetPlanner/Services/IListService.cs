using BudgetPlanner.DTO.Lists;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BudgetPlanner.Services
{
    public interface IListService
    {
        Task<List<ListWithTimestampsDto>> GetCreated(string searchKeyword);

        Task<List<ListWithTimestampsDto>> GetShared(string searchKeyword);

        Task<ListWithTimestampsDto?> Create(ListForCreateDto listToAdd);

        Task<ListWithTimestampsDto?> Update(ListForUpdateDto listForUpdate);

        Task<ListDetailsDto?> GetDetails(Guid listId);
    }
}
