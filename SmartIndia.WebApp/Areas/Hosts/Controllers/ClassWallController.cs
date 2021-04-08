using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    
    public class ClassWallController : Controller
    {
        [Authorize(Roles = "Host")]
        public IActionResult ClassWall()
        {
            return View();
        }
        [Authorize(Roles = "Host")]
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
