using BudgetPlanner.Models;
using BudgetPlanner.Validators;

namespace BudgetPlanner.DTO
{
    public class UserWithTypeDto
    {
        public string Email { get; set; } = null!;

        [Contains(ListUserType.Contributor, ListUserType.Visitor)]
        public ListUserType Type { get; set; }
    }
}
