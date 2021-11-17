using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Models;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
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