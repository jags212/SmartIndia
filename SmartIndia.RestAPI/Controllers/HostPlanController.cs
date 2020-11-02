using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class HostPlanController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public HostPlanController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [HttpGet("BindHostPlan")]// Course wise attendee
        [Obsolete]
        public async Task<List<GetHostplan>> HostPlan()
        {
            using (var hostPlanServices = new HostPlanServices(connectionFactory))
            {
                return await Task.FromResult(hostPlanServices.HostPlan());

            }
        }
    }
}
