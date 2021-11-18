using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetPlanner.Models
{
    public class LoginResult
    {
        public string Id { get; set; }

        public string Token { get; set; }

        public DateTime Expiration { get; set; }
    }
}
