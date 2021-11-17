using System;
using BudgetPlanner.Models;

namespace BudgetPlanner.DTO
{
    public class ItemDto
    {        
        public Guid Id { get; set; }
        
        public string Name { get; set; } = null!;

        public double Price { get; set; }
    }
}