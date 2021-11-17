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
        public IActionResult UpdateItem(ItemDto itemDto)
        {
            var updatedItemDto = _itemService.Update(itemDto);

            if (updatedItemDto == null) return NotFound();
            
            return Ok(updatedItemDto);
        }
    }
}