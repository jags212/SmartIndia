using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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
    public class HostCoursesController : ControllerBase
    {

        private readonly IConnectionFactory connectionFactory;

        public HostCoursesController(IConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        [HttpPost("AddCourse")]
        public async Task<HostCourseReturnParam> HostCourseAction(HostCourses obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.HostCourseAction(obj));
            }
        }
        [HttpGet("GetHostCourse")]
        [Obsolete]
        public async Task<List<HostCourses>> GetHostCourse([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.GetHostCourse(obj));

            }
        }
        [HttpGet("GetHostCourses")]
        [Obsolete]
        public async Task<List<HostCourses>> GetHostCourses([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.GetHostCourse(obj));

            }
        }

        [HttpPost("UploadImage")]
        public IActionResult UploadImage(string id)
        {
            try
            {
                var file = Request.Form.Files["UploadedImage"];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var filName = id;

                    FileInfo fi = new FileInfo(fName);
                    // Get file extension   
                    string extn = fi.Extension;
                    var fileName = filName + extn;

                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost("UploadFile")]
        public IActionResult UploadFile(string id)
        {
            try
            {
                var file = Request.Form.Files["UploadedBrochure"];
                var folderName = Path.Combine("Resources", "Brochure");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                   // var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var filName = id;

                    FileInfo fi = new FileInfo(fName);
                    // Get file extension   
                    string extn = fi.Extension;
                    var fileName = filName + extn;


                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
