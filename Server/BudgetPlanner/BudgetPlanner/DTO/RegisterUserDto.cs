using System.ComponentModel.DataAnnotations;

namespace BudgetPlanner.DTO
{
    public class RegisterUserDto
    {
        [EmailAddress]
        public string Email { get; set; } = null!;

        [StringLength(255, ErrorMessage = "Must be between 8 and 255 characters", MinimumLength = 8)]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}