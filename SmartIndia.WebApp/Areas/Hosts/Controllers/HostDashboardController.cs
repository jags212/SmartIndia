using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    public class HostDashboardController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
        public IActionResult CourseDetails(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
    }
}
