using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.ManageUsers.Controllers
{
    [Area("ManageUsers")]
    public class UsersController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }
        public IActionResult Verification()
        {
            return View();
        }
        public IActionResult VerificationEmail()
        {
            return View();
        }
        public IActionResult ForgotPassword()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> AthenticationUser(string username)
        {
            var userClaims = new List<Claim>()
                {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Email, username),
                 };

            var grandmaIdentity = new ClaimsIdentity(userClaims, "User Identity");

            var userPrincipal = new ClaimsPrincipal(new[] { grandmaIdentity });
            await HttpContext.SignInAsync(userPrincipal);
            return Json(1);
        }
        [HttpPost]
        public JsonResult RomoveAuth()
        {
            foreach (var cookieKey in Request.Cookies.Keys)
            {
                Response.Cookies.Delete(cookieKey);
            }
            return Json(1);
        }
        public IActionResult Thankyou()
        {
            return View();
        }
        public IActionResult mThankyou()
        {
            return View();
        }
        public IActionResult OTPVerification()
        {
            return View();
        }
        public IActionResult ResetLink()
        {
            return View();
        }
        [HttpGet]
        public IActionResult ResetPassword([FromQuery]string Id)
        {
            ViewBag.ACode = Id;
            return View();
        }
        [HttpGet]
        public IActionResult UserVerification([FromQuery]string Id,int Resources)
        {
            ViewBag.ACode = Id;
            ViewBag.DeviceResources = Resources;
            return View();
        }
        public IActionResult EmailConfirmation()
        {
            foreach (var cookieKey in Request.Cookies.Keys)
            {
                Response.Cookies.Delete(cookieKey);
            }
            return View();
        }
        public IActionResult Profile()
        {
            return View();
        }
        public IActionResult ChangePassword()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> AthenticationUserRole(string UserId, string RoleName)
        {
            var userClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, UserId.ToString()),
                new Claim(ClaimTypes.Role, RoleName)
            };

            //var claimsIdentity = new ClaimsIdentity(userClaims, "User Identity");
            var claimsIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);
            //var userPrincipal = new ClaimsPrincipal(new[] { claimsIdentity });
            //HttpContext.SignInAsync(userPrincipal);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            return Json(1);
        }
        public async Task<IActionResult> Logout()
        {
            foreach (var cookieKey in Request.Cookies.Keys)
            {
                Response.Cookies.Delete(cookieKey);
            }
            //HttpContext.SignOutAsync();
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Users", new { Area = "ManageUsers" });
        }

        public IActionResult ChangeEmail()
        {
            return View();
        }
        [HttpGet]
        public IActionResult ChangeEmailVerification([FromQuery] string Id)
        {
            ViewBag.ACode = Id;
            return View();
        }
        public IActionResult ConfirmEmail()
        {
            return View();
        }
        public IActionResult ChangeMobileNo()
        {
            return View();
        }
    }
}