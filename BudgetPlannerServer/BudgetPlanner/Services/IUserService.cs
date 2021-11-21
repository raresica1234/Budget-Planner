using System.Threading.Tasks;
using BudgetPlanner.DTO;

namespace BudgetPlanner.Services
{
    public interface IUserService
    {
        Task RegisterAsync(RegisterUserDto registerUserDto);

        Task<string?> LoginAsync(LoginUserDto loginUserDto);
    }
}
