using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SmartIndia.WebApp.Models;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    public class CoursesController : Controller
    {
        [Authorize(Roles = "Host")]
        public IActionResult HostDashboard()
        {
            return View();
        }
        [Authorize(Roles = "Host")]
        public IActionResult Courses()
        {
            return View();
        }
        public IActionResult CoursesWebView()
        {
            return View();
        }
    }
}
