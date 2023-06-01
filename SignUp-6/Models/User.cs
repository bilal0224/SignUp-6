
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SignUp_6.Models
{
	public class User
	{
        public int Id { get; set; }

        [Required(ErrorMessage = "FirstName is required")]
        [StringLength(12, MinimumLength = 1, ErrorMessage = "Must be at most 12 characters long")]
        public string? FirstName { get; set; }

        [Display(Name = "LastName")]
        [Required(ErrorMessage = "LastName is required")]
        [StringLength(16, MinimumLength = 1, ErrorMessage = "Must be at most 16 characters long")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be longer than 8", MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must be atleast 8 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Please confirm your Password")]
        [StringLength(255, ErrorMessage = "Must be longer than 8", MinimumLength = 8)]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        [NotMapped]
        public string? ConfirmPassword { get; set; }
    }
}

