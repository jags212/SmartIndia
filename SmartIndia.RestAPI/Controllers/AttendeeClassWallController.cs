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
    public class AttendeeClassWallController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public AttendeeClassWallController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("BindClassWallCallendar")]
        [Obsolete]
        public async Task<List<ClassWallCalender>> BindClassWallCallendar([FromQuery] HostParameter obj)
        {
            using (var attendeeClassWallServices = new AttendeeClassWallServices(connectionFactory))
            {
                return await Task.FromResult(attendeeClassWallServices.BindClassWallCallendar(obj));

            }
        }
        [HttpGet("BindClassWallDetail")]
        [Obsolete]
        public async Task<List<ClassWallClassDetails>> BindClassWallDetail([FromQuery] HostParameterCourseDetail obj)
        {
            using (var attendeeClassWallServices = new AttendeeClassWallServices(connectionFactory))
            {
                return await Task.FromResult(attendeeClassWallServices.BindClassWallDetail(obj));

            }
        }
    }
}
