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

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeUpcomingClassesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public AttendeeUpcomingClassesController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("AttendeeUpcomingClass")]
        [Obsolete]
        public async Task<List<UpcomingClassCalender>> BindUpcommingClasses([FromQuery] HostParameter obj)
        {
            using (var attendeeUpcommingClassesServices = new AttendeeUpcommingClassesServices(connectionFactory))
            {
                return await Task.FromResult(attendeeUpcommingClassesServices.BindUpcommingClasses(obj));

            }
        }
        [HttpGet("AttendeeUpcommingClassDetail")]
        [Obsolete]
        public async Task<List<UpcomingClassDetails>> BindUpcommingClassDetail([FromQuery] HostParameterCourseDetail obj)
        {
            using (var attendeeUpcommingClassesServices = new AttendeeUpcommingClassesServices(connectionFactory))
            {
                return await Task.FromResult(attendeeUpcommingClassesServices.BindUpcommingClassDetail(obj));

            }
        }
    }
}
