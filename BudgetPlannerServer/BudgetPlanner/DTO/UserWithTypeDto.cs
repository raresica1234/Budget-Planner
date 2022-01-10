using BudgetPlanner.Models;
using BudgetPlanner.Validators;

namespace BudgetPlanner.DTO
{
    public class UserWithTypeDto
    {
        public string Email { get; set; } = null!;

        [OneOf(ListUserType.Contributor, ListUserType.Visitor, ErrorMessage = "The user can only be a contributor or visitor!")]
        public ListUserType Type { get; set; }


        public UserWithTypeDto()
        {
        }


        public UserWithTypeDto(ListUser listUser)
        {
            Email = listUser.User.Email;
            Type = listUser.ListUserType;
        }
    }
}
