using System;
using System.Threading.Tasks;
using BudgetPlanner.DTO;
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

        [HttpPost]
        public async Task<IActionResult> AddItem(ItemCreateDto itemCreateDto)
        {
            var addedItemDto = await _itemService.AddAsync(itemCreateDto);
            
            return Ok(addedItemDto);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateItem(ItemUpdateDto itemUpdateDto)
        {
            var updatedItemDto = await _itemService.UpdateAsync(itemUpdateDto);

            if (updatedItemDto == null) return NotFound();

            return Ok(updatedItemDto);
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(Guid itemId)
        {
            var isDeleted = await _itemService.DeleteAsync(itemId);

            if (isDeleted) return Ok();

            return NotFound();
        }
    }
}