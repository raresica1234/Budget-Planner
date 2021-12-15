using BudgetPlanner.Context;
using BudgetPlanner.Middlewares;
using BudgetPlanner.Models;
using BudgetPlanner.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace BudgetPlanner
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureAuthentication(services);

            services.AddCors(config =>
                config.AddDefaultPolicy(options =>
                    options.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "BudgetPlanner", Version = "v1"});
            });
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString(nameof(DataContext))));

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IItemService, ItemService>();
            services.AddTransient<IListService, ListService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BudgetPlanner v1"));
                app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            }

            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });
        }
    }
}
