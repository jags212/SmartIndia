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
    public class AttendeesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public AttendeesController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("BindAttendees")]// Course wise attendee
        [Obsolete]
        public async Task<List<GetAttendees>> BindAttendees([FromQuery] HostParameter obj)
        {
            using (var attendeesServices = new AttendeesServices(connectionFactory))
            {
                return await Task.FromResult(attendeesServices.BindAttendees(obj));

            }
        }
        [HttpGet("BindAWC")]//Attendee Wise Course
        [Obsolete]
        public async Task<List<GetAWC>> BindAWC([FromQuery] HostParameter obj)
        {
            using (var attendeesServices = new AttendeesServices(connectionFactory))
            {
                return await Task.FromResult(attendeesServices.BindAWC(obj));

            }
        }
        [HttpGet("BindCWA")]//Course Wise Attendee
        [Obsolete]
        public async Task<List<GetCWA>> BindCWA([FromQuery] HostParameter obj)
        {
            using (var attendeesServices = new AttendeesServices(connectionFactory))
            {
                return await Task.FromResult(attendeesServices.BindCWA(obj));

            }
        }

        [HttpGet("BindAttendeeCourseDetails")]//Attendee wise course details
        [Obsolete]
        public async Task<List<GetCoursedetails>> BindAttendeeCourseDetails([FromQuery] CourseWiseAttendee obj)
        {
            using (var attendeesServices = new AttendeesServices(connectionFactory))
            {
                return await Task.FromResult(attendeesServices.BindAttendeeCourseDetails(obj));

            }
        }
        [HttpGet("BindMonthlyRevienue")]// Course wise attendee
        [Obsolete]
        public async Task<List<GetMonthlyRevienue>> BindMonthlyRevienue([FromQuery] HostParameter obj)
        {
            using (var attendeesServices = new AttendeesServices(connectionFactory))
            {
                return await Task.FromResult(attendeesServices.BindMonthlyRevienue(obj));

            }
        }
    }
}
