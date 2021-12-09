using System;
using System.ComponentModel.DataAnnotations;

namespace BudgetPlanner.Models
{
    public class Item
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }

        public List List { get; set; } = null!;

        public Guid ListId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
