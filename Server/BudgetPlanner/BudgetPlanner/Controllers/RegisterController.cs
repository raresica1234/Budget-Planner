using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IUserService _userService;

        public RegisterController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<string>> RegisterUser(RegisterUserDto registerUserDto)
        {
            await _userService.RegisterAsync(registerUserDto);

            return Ok();
        }
    }
}
