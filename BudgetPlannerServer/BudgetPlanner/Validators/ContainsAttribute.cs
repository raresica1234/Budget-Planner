using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace BudgetPlanner.Validators
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public class ContainsAttribute : ValidationAttribute
    {
        private object[] validOptions;

        public ContainsAttribute(params object[] validOptions)
        {
            this.validOptions = validOptions;
        }

        public override bool IsValid(object? value)
        {
            return validOptions.Contains(value);
        }
    }
}
