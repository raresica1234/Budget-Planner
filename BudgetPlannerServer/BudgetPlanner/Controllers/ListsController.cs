using BudgetPlanner.DTO.Lists;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public async Task<IActionResult> GetUserCreatedLists(string? search = null)
        {
            var userCreatedLists = await _listService.GetCreated(search ?? "");

            return Ok(userCreatedLists);
        }
        
        [HttpGet("shared")]
        public async Task<IActionResult> GetUserSharedLists(string? search = null)
        {
            var userSharedLists = await _listService.GetShared(search ?? "");

            return Ok(userSharedLists);
        }

        [HttpGet("{listId}")]
        public async Task<IActionResult> GetListDetails(Guid listId)
        {
            var listDetails = await _listService.GetDetails(listId);

            if (listDetails == null)
                return Unauthorized();

            return Ok(listDetails);
        }

        [HttpPost]
        public async Task<IActionResult> CreateList(ListForCreateDto listToAdd)
        {
            var createdList = await _listService.Create(listToAdd);

            if (createdList == null)
                return Unauthorized();

            return Ok(createdList);
        }
        
        [HttpPut]
        public async Task<IActionResult> UpdateList(ListForUpdateDto listForUpdate)
        {
            var updatedList = await _listService.Update(listForUpdate);

            if (updatedList == null)
            {
                return Unauthorized();
            }

            return Ok(updatedList);
        }
    }
}
