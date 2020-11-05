using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;
        IConfiguration _configuration;
        [Obsolete]
        private readonly IHostingEnvironment _environment;

        [Obsolete]
        public UserRegistrationController(IConnectionFactory connectionFactory, IConfiguration configuration,IHostingEnvironment environment)
        {
            this.connectionFactory = connectionFactory;
            _configuration = configuration;
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
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
        public async Task<ReturnParamMsg> ResetPassword(ResetParam obj)
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

        [HttpGet("GetProfileImage")]
        [Obsolete]
        public async Task<List<UserRegistrationInterestDetails>> GetProfileImage([FromQuery] Getprofileimage obj)
        {
            using (var userRegistrationServices = new UserRegistrationServices(connectionFactory))
            {
                UserRegistrationInterestDetails getprofileimage = new UserRegistrationInterestDetails();
                getprofileimage = userRegistrationServices.GetProfileImage(obj).SingleOrDefault();

                if (getprofileimage.ImageExt != null && getprofileimage.ImageExt != "")
                {
                    var imageName = getprofileimage.ImageName + "." + getprofileimage.ImageExt;
                    var uploads = Path.Combine(_environment.WebRootPath, "ProfileImage");
                    getprofileimage.filePath = Path.Combine(_environment.WebRootPath, "ProfileImage" + "\\" + imageName + "");
                    FileInfo fi = new FileInfo(uploads + "\\" + imageName + "");
                    getprofileimage.ImageExt = fi.Extension.Replace(".", string.Empty);
                    getprofileimage.ImageName = imageName;
                    Byte[] b;
                    if (System.IO.File.Exists(getprofileimage.filePath))
                    {
                        b = System.IO.File.ReadAllBytes(getprofileimage.filePath);
                        getprofileimage.ImageUrl = "data:image/" + getprofileimage.ImageExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                    }
                    else
                    {
                        getprofileimage.ImageUrl = "/assets/img/user1.jpg";
                    }
                }
                else
                {
                    getprofileimage.ImageUrl = "/assets/img/user1.jpg";
                }

                List<UserRegistrationInterestDetails> list = new List<UserRegistrationInterestDetails>();
                list.Add(getprofileimage);
                return await Task.FromResult(list);

            }
        }
        [HttpPost("UpdateUserProfile")]
        public async Task<ReturnParamMsg> UpdateUser(UserRegistrationDetails userRegistration)
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
        [HttpPost("UploadImage")]
        [Obsolete]
        public IActionResult UploadImage(string id)
        {
            try
            {
                var file = Request.Form.Files["UploadedImage"];
                var folderName = Path.Combine(_environment.WebRootPath, "ProfileImage");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var filName = id;

                    FileInfo fi = new FileInfo(fName);
                    // Get file extension   
                    string extn = fi.Extension;
                    var fileName = filName + extn;

                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}