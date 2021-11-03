using System.Threading.Tasks;
using BudgetPlanner.Context;
using BudgetPlanner.DTO;
using BudgetPlanner.Models;

namespace BudgetPlanner.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        
        public UserService(DataContext context)
        {
            _context = context;
        }

        public async Task RegisterAsync(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                Email = registerUserDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password)
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}