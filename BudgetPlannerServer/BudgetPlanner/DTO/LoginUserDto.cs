using System.ComponentModel.DataAnnotations;

namespace BudgetPlanner.DTO
{
    public class LoginUserDto
    {
        [EmailAddress]
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}