using BudgetPlanner.Models;

namespace BudgetPlanner.DTO
{
    public class UserWithTypeDto
    {
        public string Email { get; set; } = null!;

        public ListUserType Type { get; set; }
    }
}
