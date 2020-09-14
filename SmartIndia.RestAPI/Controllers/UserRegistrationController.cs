using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities;
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
        public async Task<ReturnParam> UserRegistrationAdd(UserRegistration obj)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.UserRegestrationAction(obj));
            }
        }
        [HttpPost("UpdateVerifiedUser")]
        public async Task<ReturnParam> UpdateVerifiedUser(UserRegistration obj)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.UpdateVerifiedUser(obj));
            }
        }
        [HttpGet("CheckValidEmail")]
        public async Task<UserRegistration> CheckValidEmail(string email, string AppURL)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.CheckValidEmail(email, AppURL));
            }
        }
        [HttpPost("ResetPassword")]
        public async Task<string> ResetPassword(ResetParam obj)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.UpdareResetPassword(obj));
            }
        }
        [HttpGet("UserEmailVerification")]
        public async Task<bool> UserEmailVerification(string acode)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.VerifyUser(acode));
            }
        }
    }
}