using BudgetPlanner.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BudgetPlanner.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly IListService _listService;

        public ListsController(IListService listService)
        {
            _listService = listService;
        }

        [HttpGet("created")]
        public async Task<IActionResult> GetUserCreatedLists()
        {
            var userCreatedLists = await _listService.GetCreated();

            return Ok(userCreatedLists);
        }

        [HttpGet("shared")]
        public async Task<IActionResult> GetUserSharedLists()
        {
            var userSharedLists = await _listService.GetShared();

            return Ok(userSharedLists);
        }
    }
}
