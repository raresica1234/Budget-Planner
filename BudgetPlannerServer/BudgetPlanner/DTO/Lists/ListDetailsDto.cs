using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetPlanner.DTO.Lists
{
    public class ListDetailsDto
    {
        public List<ItemUpdateDto> Items { get; set; } = new ();
        public double Sum { get; set; }
        public List<SimpleUserDto> Users { get; set; } = new ();

        public ListDetailsDto(List<ItemUpdateDto> items, double sum, List<SimpleUserDto> users)
        {
            Items = items;
            Sum = sum;
            Users = users;
        }
    }
}
