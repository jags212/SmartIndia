﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    public class ReschedulingController : Controller
    {
        public IActionResult HostDashboard()
        {
            return View();
        }
        public IActionResult Rescheduling()
        {
            return View();
        }
    }
}
