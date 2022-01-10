﻿using BudgetPlanner.DTO.Items;
using System.Collections.Generic;

namespace BudgetPlanner.DTO.Lists
{
    public class ListDetailsDto
    {
        public string Name { get; set; }
        public List<ItemDetailsDto> Items { get; set; } = new ();
        public double Sum { get; set; }
        public List<SimpleUserDto> Users { get; set; } = new ();

        public ListDetailsDto(string name, List<ItemDetailsDto> items, double sum, List<SimpleUserDto> users)
        {
            Name = name;
            Items = items;
            Sum = sum;
            Users = users;
        }
    }
}
