using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BudgetPlanner.Models
{
    public class User : IdentityUser
    {
        public ICollection<List> Lists { get; set; }
        public List<ListUser> ListUsers { get; set; }
    }
}
