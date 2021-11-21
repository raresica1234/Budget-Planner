using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetPlanner.DTO;
using BudgetPlanner.Exceptions;
using BudgetPlanner.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace BudgetPlanner.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public UserService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task RegisterAsync(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                UserName = registerUserDto.Email,
                Email = registerUserDto.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerUserDto.Password);

            if (!result.Succeeded)
            {
                IEnumerable<string> errorList = result.Errors.ToList().Select(error => error.Description);
                string formattedErrors = string.Join("\n", errorList);
                throw new Exceptions.ApplicationException(formattedErrors);
            }
        }

        public async Task<string?> LoginAsync(LoginUserDto loginUserDto){
            var user = await _userManager.FindByEmailAsync(loginUserDto.Email);

            if(user == null)
                return null;

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);
            if (!isPasswordCorrect)
                return null;

            var authenticationClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var authenticationSigningKey = 
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMonths(1),
                claims: authenticationClaims,
                signingCredentials: new SigningCredentials(
                    authenticationSigningKey,
                    SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
