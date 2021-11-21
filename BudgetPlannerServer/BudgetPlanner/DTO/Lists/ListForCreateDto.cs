using System.Collections.Generic;

namespace BudgetPlanner.DTO.Lists
{
    public class ListForCreateDto
    {
        public string Name { get; set; } = null!;

        public List<UserWithTypeDto> Users { get; set; } = new ();
    }
}
