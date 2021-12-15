using System;
using BudgetPlanner.Models;

namespace BudgetPlanner.DTO
{
    public class ItemUpdateDto
    {        
        public Guid Id { get; set; }
        
        public string Name { get; set; } = null!;

        public double Price { get; set; }

        public ItemUpdateDto()
        {

        }

        public ItemUpdateDto(Guid id, string name, double price)
        {
            Id = id;
            Name = name;
            Price = price;
        }
    }
}