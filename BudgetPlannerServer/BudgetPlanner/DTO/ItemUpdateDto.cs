using System;
using BudgetPlanner.Models;

namespace BudgetPlanner.DTO
{
    public class ItemUpdateDto
    {        
        public Guid Id { get; set; }
        
        public string Name { get; set; } = null!;

        public double Price { get; set; }
    }
}