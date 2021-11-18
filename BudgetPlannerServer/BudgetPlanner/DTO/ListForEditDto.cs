using System;
using System.Collections.Generic;

namespace BudgetPlanner.DTO
{
    public class ListForEditDto
    {
        public Guid Id { get; set; } = Guid.Empty;

        public string Name { get; set; } = null!;

        public List<UserWithTypeDto> Users { get; set; } = new ();
    }
}
