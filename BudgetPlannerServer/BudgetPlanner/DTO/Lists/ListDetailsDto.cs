using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetPlanner.DTO.Lists
{
    public class ListDetailsDto
    {
        List<ItemDto> Items { get; set; } = null!;
        double Sum { get; set; }
        List<SimpleUserDto> Users { get; set; } = null!;

        public ListDetailsDto(List<ItemDto> items, double sum, List<SimpleUserDto> users)
        {
            Items = items;
            Sum = sum;
            Users = users;
        }
    }
}
