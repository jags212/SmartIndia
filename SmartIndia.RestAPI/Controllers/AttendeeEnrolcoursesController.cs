using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities.Attendee;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Attendee;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeEnrolcoursesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public AttendeeEnrolcoursesController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [HttpGet("AttendeeEnrollclass")]
        [Obsolete]
        public async Task<List<AttendeeEnrollclasses>> BindCourses([FromQuery] AttendeeParameterEnrolclass obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.BindCourses(obj));

            }
        }
        [HttpGet("GetCoursedetails")]
        [Obsolete]
        public async Task<List<HostCoursesforEnroll>> GetCoursedetail([FromQuery] HostEnrollcourse obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.GetCoursedetail(obj));

            }
        }
        [HttpPost("EnrollClass")]
        public async Task<string> EnrollClasses(EnrollClasses obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.EnrollClasses(obj));
            }
        }
        [HttpPost("ShowInterest")]
        public async Task<string> ShowInterests(EnrollClasses obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.ShowInterests(obj));
            }
        }
        [HttpPost("AddtoFavorite")]
        public async Task<string> AddtoFavorites(EnrollClasses obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.AddtoFavorites(obj));
            }
        }
    }
}
