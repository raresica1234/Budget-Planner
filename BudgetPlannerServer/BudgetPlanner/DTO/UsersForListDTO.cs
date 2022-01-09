using System.Collections.Generic;

namespace BudgetPlanner.DTO
{
    public class UsersForListDTO
    {
        public List<UserWithTypeDto> LinkedUsers { get; set; } = new();

        public List<string> RelevantEmails { get; set; } = new();
    }
}
