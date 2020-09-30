using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostDashboardController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public HostDashboardController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("BindHostUpcommingClasses")]
        [Obsolete]
        public async Task<List<UpcomingClassCalender>> BindUpcommingClasses([FromQuery] HostParameter obj)
        {
            using (var hostDashboardServices = new HostDashboardServices(connectionFactory))
            {
                return await Task.FromResult(hostDashboardServices.BindUpcommingClasses(obj));

            }
        }
        [HttpGet("HostUpcommingClassDetail")]
        [Obsolete]
        public async Task<List<UpcomingClassDetails>> BindUpcommingClassDetail([FromQuery] HostParameterCourseDetail obj)
        {
            using (var hostDashboardServices = new HostDashboardServices(connectionFactory))
            {
                return await Task.FromResult(hostDashboardServices.BindUpcommingClassDetail(obj));

            }
        }
    }
}
