using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Attendee.Controllers
{
    [Area("Attendee")]
    
    public class DashboardController : Controller
    {
        [Authorize(Roles = "Host,Attendee")]
        public IActionResult AttendeeDashboard()
        {
            return View();
        }

        public IActionResult AttendeeDashboardWebView()
        {
            return View();
        }
    }
}