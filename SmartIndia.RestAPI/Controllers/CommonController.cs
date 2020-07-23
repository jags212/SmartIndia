using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController] 
    public class CommonController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        public CommonController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [Authorize]
        [HttpGet]
        public async Task<IList<ConfigCountrys>> GetCountryList()
        {
            using (var CountryList = new CommonDataServices(connectionFactory))
            {
                return await Task.FromResult(CountryList.GetCountries());
            }
        }
        [HttpGet]
        public async Task<string> Test()
        {
            return await Task.FromResult("I am Here");
        }
    }
}