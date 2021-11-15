using System;
using System.ComponentModel.DataAnnotations;

namespace BudgetPlanner.Models 
{
    public class List 
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
