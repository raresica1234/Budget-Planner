using System;

namespace BudgetPlanner.DTO.Items
{
    public class ItemCreateDto
    {
        public Guid Id { get; set; }

        public Guid ListId { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }
    }
}