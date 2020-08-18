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
    public class HostCoursesController : ControllerBase
    {

        private readonly IConnectionFactory connectionFactory;

        public HostCoursesController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [HttpPost("AddCourse")]
        public async Task<string> HostCourseAction(HostCourses obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.HostCourseAction(obj));
            }
        }
        [HttpGet("GetHostCourse")]
        public async Task<List<HostCourses>> GetHostCourse([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.GetHostCourse(obj));

            }
        }
        [HttpGet("GetHostCourses")]
        public async Task<List<HostCourses>> GetHostCourses([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.GetHostCourse(obj));

            }
        }
    }
}
