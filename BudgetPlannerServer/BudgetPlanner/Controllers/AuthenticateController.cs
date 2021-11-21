using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthenticateController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto)
        {
            await _userService.RegisterAsync(registerUserDto);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            var loginResult = await _userService.LoginAsync(loginUserDto);

            if (loginResult == null)
                return Unauthorized();

            return Ok(new
            {
                Token = loginResult
            });
        }
    }
}
