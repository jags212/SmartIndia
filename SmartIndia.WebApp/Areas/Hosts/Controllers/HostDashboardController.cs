using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    public class HostDashboardController : Controller
    {
        [Authorize(Roles = "Host")]
        public IActionResult Dashboard()
        {
            return View();
        }
        [Authorize(Roles = "Host")]
        public IActionResult CourseDetails(string SID)
        {
            ViewBag.id = SID;
            return View();
        }

        public IActionResult DashboardWebView()
        {
            return View();
        }
        public IActionResult CourseDetailsWebView(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
    }
}
