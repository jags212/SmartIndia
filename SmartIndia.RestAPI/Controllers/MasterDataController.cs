using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Services.MasterData;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterDataController : ControllerBase
    {
        private IMasterDataService _masterData;
        public MasterDataController(IMasterDataService masterData)
        {
            _masterData = masterData;
        }
        [HttpGet("GetCountryData")]
        public IActionResult GetCountries()
        {
            var country = _masterData.GetCountries();
            return Ok(country);
        }
        [HttpGet("GetCourseInterest")]
        public IActionResult GetCourseInterest()
        {
            var country = _masterData.GetCourseInterest();
            return Ok(country);
        }
    }
}