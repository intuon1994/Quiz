using System.ComponentModel.DataAnnotations;

namespace JwtAuthAPI.Models
{
    public class UserForm
    {
     
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        
        [Required]
        public string ConfirmPassword { get; set; }
      
        public string? Token { get; set; }
    }

    public class LoginForm {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public string? Token { get; set; }

    }
}
