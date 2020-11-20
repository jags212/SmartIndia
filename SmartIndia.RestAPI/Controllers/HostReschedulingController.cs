using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostReschedulingController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public HostReschedulingController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        [HttpGet("Bindrescheduling")]
        
        public async Task<List<GetReschedulingDetails>> BindSchedular([FromQuery] HostParameter obj)
        {
            using (var hostSchedulingServices = new HostReschedulingServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedulingServices.BindSchedular(obj));

            }
        }

        [HttpGet("GetSchedular")]
    
        public async Task<List<UpdateHostSchedular>> UpdateHSchedular([FromQuery] UpdateHostParameter obj)
        {
            using (var hostSchedulingServices = new HostReschedulingServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedulingServices.UpdateHSchedular(obj));

            }
        }
        [HttpPost("UpdateSchedular")]
        public async Task<ReturnParamMsg> UpdateHostSchedularActionOnce(HostSchedular obj)
        {
            using (var hostReschedulingServices = new HostReschedulingServices(connectionFactory))
            {
                return await Task.FromResult(hostReschedulingServices.UpdateHostSchedularActionOnce(obj));
            }
        }
        [HttpPost("CancelSchedular")]
        public async Task<ReturnParamMsg> CancelHostSchedular(HostSchedularCancel obj)
        {
            using (var hostReschedulingServices = new HostReschedulingServices(connectionFactory))
            {
                return await Task.FromResult(hostReschedulingServices.CancelHostSchedular(obj));
            }
        }
    }
}
