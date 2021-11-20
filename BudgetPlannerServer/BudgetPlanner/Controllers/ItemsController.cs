using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Models;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetPlanner.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateItem(ItemDto itemDto)
        {
            var updatedItemDto = await _itemService.UpdateAsync(itemDto);

            if (updatedItemDto == null) return NotFound();
            
            return Ok(updatedItemDto);
        }
    }
}