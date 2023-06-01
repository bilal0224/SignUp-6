using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignUp_6.Data_Access;
using SignUp_6.Models;

namespace SignUp_6.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserContext? _userContext;

        public UserController(UserContext userContext)
        {
            _userContext = userContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_userContext?.Users == null)
            {
                return NotFound();
            }
            return await _userContext.Users.ToListAsync();
        }
        [Produces("application/json")]
        [Route("signup")]
        [HttpPost]
        public IActionResult AddUser([FromBody]User user)
        {
            if (ModelState.IsValid)
            {
                var exist =_userContext?.Users.Where(x => x.Email == user.Email).FirstOrDefault();

                if (exist != null)
                {
                    return StatusCode(201);
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _userContext?.Users.Add(user);
                _userContext?.SaveChanges();
                return Ok();
            }

            return BadRequest(ModelState.ToDictionary(
              kvp => kvp.Key,
              kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            ));
        }
    }
}

