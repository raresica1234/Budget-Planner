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
        public async Task<ActionResult<string>> RegisterUser(RegisterUserDto registerUserDto)
        {
            await _userService.RegisterAsync(registerUserDto);

            return Ok();
        }
    }
}
