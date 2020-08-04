using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Services;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public UserRegistrationController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [HttpPost("AddUser")]
        public async Task<string> UserRegistrationAdd(UserRegistration obj)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.UserRegestrationAction(obj));
            }
        }
    }
}