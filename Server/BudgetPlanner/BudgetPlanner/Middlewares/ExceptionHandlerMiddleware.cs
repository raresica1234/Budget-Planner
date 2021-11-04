using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ApplicationException = BudgetPlanner.Exceptions.ApplicationException;

namespace BudgetPlanner.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                HttpResponse response = context.Response;
                response.ContentType = "application/json";

                response.StatusCode = error switch
                {
                    ApplicationException => (int) HttpStatusCode.BadRequest,
                    _ => (int) HttpStatusCode.InternalServerError
                };

                string result = JsonSerializer.Serialize(new {message = error.Message});
                await response.WriteAsync(result);
            }
        }
    }
}
