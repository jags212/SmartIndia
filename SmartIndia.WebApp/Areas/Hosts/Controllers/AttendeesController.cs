using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    
    public class AttendeesController : Controller
    {
        [Authorize(Roles = "Host")]
        public IActionResult HostDashboard()
        {
            return View();
        }
        [Authorize(Roles = "Host")]
        public IActionResult Attendees()
        {
            return View();
        }
        public IActionResult AttendeesWebView()
        {
            return View();
        }
    }
}
