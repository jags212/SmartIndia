﻿using System;
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

        [HttpGet("BindAttendees")]
        [Obsolete]
        public async Task<List<GetAttendees>> BindAttendees([FromQuery] HostParameter obj)
        {
            using (var attendeesServices = new AttendeesServices(connectionFactory))
            {
                return await Task.FromResult(attendeesServices.BindAttendees(obj));

            }
        }
    }
}
