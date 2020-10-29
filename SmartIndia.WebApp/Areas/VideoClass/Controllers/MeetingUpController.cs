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

        public IActionResult Index(string CRID,string Id,string Name,string EmailId,string moderator)
        {
            ViewBag.UserId = Id;
            ViewBag.crid = CRID;
            ViewBag.name = Name;
            ViewBag.EmailId = EmailId;
            ViewBag.moderator = moderator;
            return View();
        }
    }
}
