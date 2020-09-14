using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public IActionResult Thankyou()
        {
            return View();
        }
        public IActionResult EmailVerification()
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
        public IActionResult UserVerification([FromQuery]string Id)
        {
            ViewBag.ACode = Id;
            return View();
        }
    }
}