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
    [Authorize(Roles = "Host")]
    public class CoursesController : Controller
    {
        public IActionResult HostDashboard()
        {
            return View();
        }
        public IActionResult Courses()
        {
            return View();
        }
    }
}
