using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace BudgetPlanner.Extensions
{
    public static class ServiceExtensions
    {
        public static Guid GetUserId(this IHttpContextAccessor httpContextAccessor)
        {
            return Guid.Parse(httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
    }
}