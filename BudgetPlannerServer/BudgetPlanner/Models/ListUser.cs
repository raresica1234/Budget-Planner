using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetPlanner.Models
{
	public class ListUser 
	{
		[ForeignKey("List")]
		public Guid ListId { get; set; }

		[ForeignKey("User")]
		public Guid UserId { get; set; }

		public ListUserType ListUserType { get; set; }
	}
}
