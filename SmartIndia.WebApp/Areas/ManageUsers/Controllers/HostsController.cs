using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.ManageUsers.Controllers
{
    [Area("ManageUsers")]
    public class HostsController : Controller
    {
        public IActionResult HostDashboard()
        {
            return View();
        }
        public IActionResult Courses()
        {
            return View();
        }
        public IActionResult Schedular()
        {
            return View();
        }
        public IActionResult Rescheduling()
        {
            return View();
        }
        public IActionResult HostProfile()
        {
            return View();
        }
        public IActionResult HostChangePassword()
        {
            return View();
        }
    }
}
