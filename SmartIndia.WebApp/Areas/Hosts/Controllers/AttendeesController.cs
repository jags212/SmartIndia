using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Hosts.Controllers
{
    [Area("Hosts")]
    [Authorize(Roles = "Host")]
    public class AttendeesController : Controller
    {
        public IActionResult HostDashboard()
        {
            return View();
        }
        public IActionResult Attendees()
        {
            return View();
        }
    }
}
