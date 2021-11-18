using BudgetPlanner.DTO;
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

        [HttpPost]
        public async Task<IActionResult> GreateList(ListForEditDto listToAdd)
        {
            var createdList = await _listService.Create(listToAdd);

            if (createdList == null)
                return Unauthorized();

            return Ok(createdList);
        }
    }
}
