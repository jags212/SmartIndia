using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SmartIndia.WebApp.Models;

namespace SmartIndia.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return RedirectToAction("Login", "Users", new { Area = "ManageUsers" });
        }

        public IActionResult Privacy()
        {
            return View();
        }
        
        public IActionResult TermsCondition()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult Course()
        {
            return View();
        }
        public IActionResult CourseDetails(string SID, string bt)
        {
            ViewBag.id = SID;
            ViewBag.BatchName = bt;
            return View();
        }
        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
