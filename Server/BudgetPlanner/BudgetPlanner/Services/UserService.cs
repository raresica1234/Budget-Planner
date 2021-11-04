using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Exceptions;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Identity;

namespace BudgetPlanner.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task RegisterAsync(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                UserName = registerUserDto.Email,
                Email = registerUserDto.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerUserDto.Password);

            if (!result.Succeeded)
            {
                IEnumerable<string> errorList = result.Errors.ToList().Select(error => error.Description);
                string formattedErrors = string.Join("\n", errorList);
                throw new ApplicationException(formattedErrors);
            }
        }
    }
}
