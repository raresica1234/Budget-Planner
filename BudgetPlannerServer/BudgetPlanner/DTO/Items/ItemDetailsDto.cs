using System;
using BudgetPlanner.Models;

namespace BudgetPlanner.DTO.Items
{
    public class ItemDetailsDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }
        
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ItemDetailsDto()
        {

        }

        public ItemDetailsDto(Item item)
        {
            Id = item.Id;
            Name = item.Name;
            Price = item.Price;
            CreatedAt = item.CreatedAt;
            UpdatedAt = item.UpdatedAt;
        }
    }
}