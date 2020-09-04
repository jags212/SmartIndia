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
    public class HostUpcomingClassesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public HostUpcomingClassesController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("BindHostUpcommingClasses")]
        [Obsolete]
        public async Task<List<UpcomingClassCalender>> BindUpcommingClasses([FromQuery] HostParameter obj)
        {
            using (var hostUpcommingClassesServices = new HostUpcommingClassesServices(connectionFactory))
            {
                return await Task.FromResult(hostUpcommingClassesServices.BindUpcommingClasses(obj));

            }
        }
    }
}
