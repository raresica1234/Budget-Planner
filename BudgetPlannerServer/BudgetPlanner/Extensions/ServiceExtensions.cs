using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace BudgetPlanner.Extensions
{
    public static class ServiceExtensions
    {
        public static String GetUserId(this IHttpContextAccessor httpContextAccessor)
        {
            return httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}