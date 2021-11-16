using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetPlanner.Models
{
    public class ListUser 
    {
        public Guid ListId { get; set; }
        public List List { get; set; } = null!;

        public string UserId { get; set; }
        public User User { get; set; } = null!;

        public ListUserType ListUserType { get; set; }
    }
}
