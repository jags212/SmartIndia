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
    public class HostSchedularController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public HostSchedularController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [HttpPost("AddSchedular")]
        public async Task<ReturnParamMsg> HostSchedularAction(List<HostSchedular> obj)
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.HostSchedularAction(obj));
            }
        }
        [HttpPost("AddSchedularOnce")]
        public async Task<ReturnParamMsg> HostSchedularActionOnce(HostSchedular obj)
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.HostSchedularActionOnce(obj));
            }
        }
        [HttpPost("UpdateSchedular")]
        public async Task<ReturnParamMsg> UpdateHostSchedularActionOnce(HostSchedular obj)
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.UpdateHostSchedularActionOnce(obj));
            }
        }
        [HttpGet("GetHostSchedular")]
        [Obsolete]
        public async Task<List<GetSchedularDetails>> GetHSchedular([FromQuery] getHostRecSchedularParameter obj)
        //public async Task<List<HostSchedular>> GetHSchedular( GetActionCode obj)// for postman 
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.GetHSchedular(obj));

            }
        }
        [HttpGet("BindSchedular")]
        [Obsolete]
        public async Task<List<BindHostSchedular>> BindSchedular([FromQuery] HostParameter obj) 
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.BindSchedular(obj));

            }
        }
        [HttpGet("GetSchedular")]
        [Obsolete]
        public async Task<List<UpdateHostSchedular>> UpdateHSchedular([FromQuery] UpdateHostParameter obj)
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.UpdateHSchedular(obj));

            }
        }
        [HttpPost("Publish")]
        public async Task<ReturnParamMsg> HostSchedularPublish(getHostRecSchedularParameter obj)
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.PublishSchedular(obj));
            }
        }
        [HttpGet("CkeckBatchName")]
        [Obsolete]
        public async Task<ReturnBoolParam> CkeckBatchNameAsync([FromQuery] CheckBatch obj)
        {
            using (var hostSchedularServices = new HostSchedularServices(connectionFactory))
            {
                return await Task.FromResult(hostSchedularServices.CkeckBatchName(obj));

            }
        }
    }
}
