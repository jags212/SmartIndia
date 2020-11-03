using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.Attendee.Controllers
{
    [Area("Attendee")]
    [Authorize(Roles = "Host,Attendee")]
    public class DashboardController : Controller
    {
        public IActionResult AttendeeDashboard()
        {
            return View();
        }
    }
}