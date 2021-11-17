using System;
using BudgetPlanner.Models;

namespace BudgetPlanner.DTO
{
    public class ItemDetailsDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }
        
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}