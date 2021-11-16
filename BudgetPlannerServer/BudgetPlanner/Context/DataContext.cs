using BudgetPlanner.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BudgetPlanner.Context
{
    public class DataContext : IdentityDbContext<User>
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<ListUser> ListUsers { get; set; }
        public DbSet<List> Lists { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasMany(user => user.Lists)
                .WithMany(list => list.Users)
                .UsingEntity<ListUser>(
                    listUser => listUser
                        .HasOne(listUser => listUser.List)
                        .WithMany(list => list.ListUsers)
                        .HasForeignKey(listUser => listUser.ListId),

                    listUser => listUser
                        .HasOne(listUser => listUser.User)
                        .WithMany(user => user.ListUsers)
                        .HasForeignKey(listUser => listUser.UserId),

                    listUser =>
                    {
                        listUser.HasKey(t => new { t.UserId, t.ListId });
                    }
                );
            base.OnModelCreating(builder);
        }
    }
}
