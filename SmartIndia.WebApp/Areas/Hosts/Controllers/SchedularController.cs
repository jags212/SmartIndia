using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    public class SchedularController : Controller
    {
        [Authorize(Roles = "Host")]
        public IActionResult HostDashboard()
        {
            return View();
        }
        [Authorize(Roles = "Host")]
        public IActionResult Schedular()
        {
            return View();
        }
        public IActionResult SchedularWebView()
        {
            return View();
        }
    }
}
