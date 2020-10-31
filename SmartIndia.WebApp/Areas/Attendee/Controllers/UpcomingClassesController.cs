using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Attendee.Controllers
{
    [Area("Attendee")]
    [Authorize]
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
    }
}
