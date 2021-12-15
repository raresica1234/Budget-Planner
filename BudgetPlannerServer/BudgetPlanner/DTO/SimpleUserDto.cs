using BudgetPlanner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetPlanner.DTO
{
    public class SimpleUserDto
    {
        public string Id { get; set; }
        public string Email { get; set; } = null!;

        public SimpleUserDto(User user)
        {
            Id = user.Id;
            Email = user.Email;
        }
    }
}
