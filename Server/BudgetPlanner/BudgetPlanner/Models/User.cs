using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User : Entity
    {
        public string Email { get; init; } = null!;
        public string Password { get; init; } = null!;

    }
}