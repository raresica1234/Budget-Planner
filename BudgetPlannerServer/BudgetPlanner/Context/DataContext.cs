using BudgetPlanner.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.Context
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

		protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<ListUser>().HasKey(listUser => new { listUser.UserId, listUser.ListId });
			base.OnModelCreating(builder);
		}

		public DbSet<Item> Items { get; set; }
        public DbSet<ListUser> ListUsers { get; set; }
        public DbSet<List> Lists { get; set; }
    }
}
