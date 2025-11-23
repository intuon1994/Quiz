using System.ComponentModel.DataAnnotations;

namespace JwtAuthAPI.Models
{
    public class tbUser
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
    }
}
