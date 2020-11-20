using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartIndia.Data.Entities;
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
        private readonly IConfiguration _configuration;

        public AttendeeClassWallController(IConnectionFactory connectionFactory, IConfiguration configuration)
        {
            this.connectionFactory = connectionFactory;
            _configuration = configuration;
        }

        [HttpGet("BindClassWallCallendar")]
        [Obsolete]
        public async Task<List<ClassWallCalender>> BindClassWallCallendar([FromQuery] HostParameter obj)
        {
            obj.Curl = _configuration.GetSection("HostURL")["ClientURL"];
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
        [Authorize]
        [HttpPost("UpdateUserRole")]
        public async Task<ReturnParamMsg> UpdateUserRole(Int64 UserId )
        {
            using (var attendeeClassWallServices = new AttendeeClassWallServices(connectionFactory))
            {
                return await Task.FromResult(attendeeClassWallServices.UpdateUserRole(UserId));
            }
        }
    }
}
