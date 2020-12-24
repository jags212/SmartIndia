using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Attendee;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeDashboardController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public AttendeeDashboardController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("BindCourseAndNoClass")]// Course wise attendee
        [Obsolete]
        public async Task<List<GetCourseandNoofclass>> GetCourseAndNoOfClass([FromQuery] HostParameter obj)
        {
            using (var attendeeDashboardServices = new AttendeeDashboardServices(connectionFactory))
            {
                return await Task.FromResult(attendeeDashboardServices.GetCourseAndNoOfClass(obj));

            }
        }
        [HttpGet("BindHostDatewise")]// Course wise attendee
        [Obsolete]
        public async Task<List<GetNoofHost>> BindHostDatewise([FromQuery] HostParameter obj)
        {
            using (var attendeeDashboardServices = new AttendeeDashboardServices(connectionFactory))
            {
                return await Task.FromResult(attendeeDashboardServices.BindHostDatewise(obj));

            }
        }
    }
}
