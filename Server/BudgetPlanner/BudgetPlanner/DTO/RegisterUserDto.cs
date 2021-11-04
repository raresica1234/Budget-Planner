﻿using System.ComponentModel.DataAnnotations;

namespace BudgetPlanner.DTO
{
    public class RegisterUserDto
    {
        [EmailAddress]
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}