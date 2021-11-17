using BudgetPlanner.Models;
using System;

namespace BudgetPlanner.DTO
{
    public class ListWithTimestampsDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ListWithTimestampsDto()
        {
        }

        public ListWithTimestampsDto(List list)
        {
            Id = list.Id;
            Name = list.Name;
            CreatedAt = list.CreatedAt;
            UpdatedAt = list.UpdatedAt;
        }
    }
}
