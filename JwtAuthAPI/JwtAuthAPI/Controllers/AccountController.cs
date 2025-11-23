using JwtAuthAPI.Data;
using JwtAuthAPI.Helpers;
using JwtAuthAPI.Models;
using JwtAuthAPI.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;


namespace JwtAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public AccountController(AppDbContext authContext) { _authContext = authContext; }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginForm userModel) {
            if (userModel == null)
                return BadRequest();

            var user = await _authContext.tbUsers
               .FirstOrDefaultAsync(x => x.UserName == userModel.UserName );

            if (user == null)
                return NotFound(new { Message = "User not found!" });

            if (!PasswordHasher.VerifyPassword(userModel.Password, user.Password))
                return BadRequest(new { Message = "Password is incorrect!, Please check again." });

            user.Token = CreateJwt(user);

            return Ok(new
            {
                Token=user.Token,
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForm userModel) {
            if (userModel == null) return BadRequest();

            if (await CheckUsernameExistAsync(userModel.UserName)) 
                return BadRequest(new { Message ="UserName: " + userModel.UserName+ " Already Exist!"});

            var passResult = CheckPasswordStrength(userModel.Password);
            if (!string.IsNullOrEmpty(passResult))
                return BadRequest(new {Message = passResult.ToString() });

            var _save = new tbUser();
           
            _save.UserName = userModel.UserName;
            _save.Password = PasswordHasher.HashPassword(userModel.Password);
            _save.Id = Guid.NewGuid().ToString();
            _save.Timestamp = DateTime.Now;
            _save.Token = "defalut";

            await _authContext.tbUsers.AddAsync(_save);
            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "User Registered!"
            });
        }

        private Task<bool> CheckUsernameExistAsync(string? username)
        => _authContext.tbUsers.AnyAsync(x => x.UserName == username);

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special charcter" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJwt(tbUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("toKenforqUiz2026auKobxVHa8vR4kI0nxwNd2B02jthenticationJWT...");
            var identity = new ClaimsIdentity(new Claim[]
            {
               // new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.UserName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [Authorize]
        [HttpGet("getusername")]
        public async Task<ActionResult<string>> GetUserName(string username)
        {
            var user = await _authContext.tbUsers.FirstOrDefaultAsync(x=>x.UserName == username);

            if (user == null) return NotFound(new { Message = "User not found!" });

            return Ok(new { Message = user.UserName});
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<tbUser>> GetAllUsers()
        {
            return Ok(await _authContext.tbUsers.ToListAsync());
        }
    }
}
