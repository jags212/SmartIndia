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
        public IActionResult ForgotPassword()
        {
            return View();
        } 
        public IActionResult Thankyou()
        {
            return View();
        }
    }
}