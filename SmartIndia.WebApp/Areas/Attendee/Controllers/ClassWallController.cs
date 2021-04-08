using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Attendee.Controllers
{
    [Area("Attendee")]
    
    public class ClassWallController : Controller
    {
        [Authorize(Roles = "Host,Attendee")]
        public IActionResult ClassWall()
        {
            return View();
        }
        [Authorize(Roles = "Host,Attendee")]
        public IActionResult ClassWallDetail(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
        public IActionResult ClassWallWebView()
        {
            return View();
        }
        public IActionResult ClassWallDetailWebView(string SID)
        {
            ViewBag.id = SID;
            return View();
        }
    }
}
