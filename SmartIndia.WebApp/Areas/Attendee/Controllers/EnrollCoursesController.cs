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
    public class EnrollCoursesController : Controller
    {
        public IActionResult EnrollCourse()
        {
            return View();
        }
        public IActionResult EnrollCourseDetails(string SID,string bt)
        {
            ViewBag.id = SID;
            ViewBag.BatchName = bt;
            return View();
        }
    }
}
