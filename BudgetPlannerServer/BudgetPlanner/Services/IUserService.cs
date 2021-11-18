using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Models;
using Microsoft.Extensions.Configuration;

namespace BudgetPlanner.Services
{
    public interface IUserService
    {
        Task RegisterAsync(RegisterUserDto registerUserDto);
        Task<LoginResult> LoginAsync(LoginUserDto loginUserDto);
    }
}
