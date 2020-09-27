using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Attendee.Controllers
{
    [Area("Attendee")]
    public class ClassWallController : Controller
    {
        public IActionResult ClassWall()
        {
            return View();
        }
        public IActionResult ClassWallDetail(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
    }
}
