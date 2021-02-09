using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MobWebViewController : ControllerBase
    {
        private static readonly string[] LinkNames = new[]
     {
            "AttendeeDashBoard", "HostDashBoard", "HostAddCourse", "HostSchedular", "HostMyClassWall", "HostUpcommingClasses", "HostAttendees", "HostRescheduling"
        };
        private static readonly string[] URLNames = new[]
     {
            "https://smart.datatech.ind.in/Attendee/Dashboard/AttendeeDashboardWebView", "https://smart.datatech.ind.in/Hosts/HostDashboard/DashboardWebView", "https://smart.datatech.ind.in/Hosts/Courses/CoursesWebView", "https://smart.datatech.ind.in/Hosts/Schedular/schedularWebView", "https://smart.datatech.ind.in/Hosts/ClassWall/ClassWallWebView", "https://smart.datatech.ind.in/Hosts/upcomingclasses/upcomingclassesWebView", "https://smart.datatech.ind.in/Hosts/attendees/attendeesWebView", "https://smart.datatech.ind.in/Hosts/Rescheduling/reschedulingWebView"
        };

        private readonly ILogger<MobWebViewController> _logger;

        public MobWebViewController(ILogger<MobWebViewController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<MobWebViewURL> Get()
        {
            //var rng = new Random();
            return Enumerable.Range(0, 7).Select(index => new MobWebViewURL
            {
                SlNo = index+1,
                LinkName = LinkNames[index],
                URLName = URLNames[index]
                
        })
            .ToArray();
        }
    }
}
