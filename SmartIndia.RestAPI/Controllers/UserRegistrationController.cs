using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        IConfiguration _configuration;

        public UserRegistrationController(IConnectionFactory connectionFactory, IConfiguration configuration)
        {
            this.connectionFactory = connectionFactory;
            _configuration = configuration;
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
        public async Task<UserRegistration> CheckValidEmail(string email)
        {
            string url = _configuration.GetSection("HostURL")["ClientURL"];
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.CheckValidEmail(email, url));
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
        [HttpGet("UserActive")]
        public async Task<bool> UserActive(string acode)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.UserActive(acode));
            }
        }
        [HttpGet("EmailConfirm")]
        public async Task<bool> IsEmailConfirm(string acode)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.IsEmailConfirm(acode));
            }
        }
        [HttpGet("GetUserDetails")]
        public async Task<UserRegistrationInterestDetails> GetUserDetails(Int64 userid)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.GetUserDetails(userid));
            }
        }
        [HttpPost("UpdateUserProfile")]
        public async Task<string> UpdateUser(UserRegistrationDetails userRegistration)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.UpdateUserData(userRegistration));
            }
        }
        [HttpGet("UserPass")]
        public async Task<bool> UserPass(string uid, string pass)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.CheckUserPass(Guid.Parse(uid), pass));
            }
        }
        [HttpGet("CkeckCurrentEmail")]
        public async Task<bool> CkeckCurrentEmailAsync(string UID, string email)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.CkeckEmailId(Guid.Parse(UID), email));

            }
        }
        [HttpPost("UpdateEmail")]
        public async Task<string> UpdateEmailid(UpdateEmail obj)
        {
            using (var userRegistrationServices = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationServices.UpdatEmailid(obj));
            }
        }
        [HttpGet("CkeckCurrentmob")]
        public async Task<bool> CkeckCurrentmobAsync(string UID, string MobNo)
        {
            using (var userRegistrationService = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationService.CkeckCurrentmobno(Guid.Parse(UID), MobNo));

            }
        }
        [HttpPost("UpdateMobileNo")]
        public async Task<string> UpdateMobileNo(UpdateMob obj)
        {
            using (var userRegistrationServices = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationServices.UpdateMobileNo(obj));
            }
        }
        [HttpPost("UpdateMobileConfirmed")]
        public async Task<string> MobileConfirmed(UpdateMobileConfirmed obj)
        {
            using (var userRegistrationServices = new UserRegistrationServices(connectionFactory))
            {
                return await Task.FromResult(userRegistrationServices.MobileConfirmed(obj));
            }
        }
    }
}