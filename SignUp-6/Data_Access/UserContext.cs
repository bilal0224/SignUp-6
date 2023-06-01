using Microsoft.EntityFrameworkCore;
using SignUp_6.Models;

namespace SignUp_6.Data_Access
{
	public class UserContext: DbContext
	{
		public UserContext(DbContextOptions<UserContext> options) : base(options)
		{
		}
        public DbSet<User> Users { get; set; }
    }
}

