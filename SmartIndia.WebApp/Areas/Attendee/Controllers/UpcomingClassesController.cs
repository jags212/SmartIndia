using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Attendee.Controllers
{
    [Area("Attendee")]
    
    public class UpcomingClassesController : Controller
    {
        [Authorize(Roles = "Host,Attendee")]
        public IActionResult UpcomingClasses()
        {
            return View();
        }
        [Authorize(Roles = "Host,Attendee")]
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
