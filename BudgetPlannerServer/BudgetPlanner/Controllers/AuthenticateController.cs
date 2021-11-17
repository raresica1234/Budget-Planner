using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Models;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BudgetPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthenticateController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> RegisterUser(RegisterUserDto registerUserDto)
        {
            await _userService.RegisterAsync(registerUserDto);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginUser(LoginUserDto loginUserDto)
        {
            LoginResult loginResult = await _userService.LoginAsync(loginUserDto, _configuration);

            if(loginResult == null)
            {
                return Unauthorized();
            }
            return Ok(loginResult);
        }
    }
}
