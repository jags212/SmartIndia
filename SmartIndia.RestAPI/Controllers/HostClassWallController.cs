using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public HostClassWallController(IConnectionFactory connectionFactory, IConfiguration configuration)
        {
            this.connectionFactory = connectionFactory; 
            _configuration = configuration;
        }

        [HttpGet("BindClassWallCallendar")]
        [Obsolete]
        public async Task<List<ClassWallCalender>> BindClassWallCallendar([FromQuery] HostParameter obj)
        {
            obj.Curl = _configuration.GetSection("HostURL")["ClientURL"];
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
