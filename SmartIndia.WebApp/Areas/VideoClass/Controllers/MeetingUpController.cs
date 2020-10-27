using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmartIndia.WebApp.Areas.VideoClass.Controllers
{
    [Area("VideoClass")]
    public class MeetingUpController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
