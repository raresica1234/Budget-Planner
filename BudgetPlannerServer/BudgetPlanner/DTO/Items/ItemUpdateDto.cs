using System;

namespace BudgetPlanner.DTO.Items
{
    public class ItemUpdateDto
    {        
        public Guid Id { get; set; }
        
        public string Name { get; set; } = null!;

        public double Price { get; set; }

        public ItemUpdateDto()
        {

        }
    }
}