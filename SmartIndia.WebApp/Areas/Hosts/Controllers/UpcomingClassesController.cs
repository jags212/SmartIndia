using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    [Authorize(Roles = "Host")]
    public class UpcomingClassesController : Controller
    {
        public IActionResult UpcomingClasses()
        {
            return View();
        }
        public IActionResult UpcomingClassDetail(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
        public IActionResult UpcomingClassesWebView()
        {
            return View();
        }

        public IActionResult UpcomingClassDetailWebView(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
    }
}
