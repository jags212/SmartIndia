﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    [Authorize(Roles = "Host")]
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
