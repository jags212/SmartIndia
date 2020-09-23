using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostClassWallController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public HostClassWallController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("BindClassWallCallendar")]
        [Obsolete]
        public async Task<List<ClassWallCalender>> BindClassWallCallendar([FromQuery] HostParameter obj)
        {
            using (var hostClassWallServices = new HostClassWallServices(connectionFactory))
            {
                return await Task.FromResult(hostClassWallServices.BindClassWallCallendar(obj));

            }
        }
        [HttpGet("BindClassWallDetail")]
        [Obsolete]
        public async Task<List<ClassWallClassDetails>> BindClassWallDetail([FromQuery] HostParameterCourseDetail obj)
        {
            using (var hostClassWallServices = new HostClassWallServices(connectionFactory))
            {
                return await Task.FromResult(hostClassWallServices.BindClassWallDetail(obj));

            }
        }
    }
}
