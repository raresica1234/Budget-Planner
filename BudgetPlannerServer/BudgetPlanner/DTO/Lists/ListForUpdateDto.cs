using System;

namespace BudgetPlanner.DTO.Lists
{
    public class ListForUpdateDto : ListForCreateDto
    {
        public Guid Id { get; set; }
    }
}
