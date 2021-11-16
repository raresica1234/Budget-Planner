using System;
using System.Collections.Generic;
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

        public ICollection<User> Users { get; set; }
        public List<ListUser> ListUsers { get; set; }
    }
}
