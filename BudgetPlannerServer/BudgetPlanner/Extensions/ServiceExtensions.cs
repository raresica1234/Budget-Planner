using System.Security.Claims;
using System.Threading.Tasks;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BudgetPlanner.Extensions
{
    public static class ServiceExtensions
    {
        public static string? GetUserId(this IHttpContextAccessor httpContextAccessor)
        {
            return httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        public static async Task<string?> GetUserIdAsync(this UserManager<User> userManager, string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            return user?.Id;
        }
    }
}