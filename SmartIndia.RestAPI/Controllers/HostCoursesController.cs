using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
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
        [Obsolete]
        private readonly IHostingEnvironment _environment;

        [Obsolete]
        public HostCoursesController(IConnectionFactory connectionFactory, IHostingEnvironment environment)
        {
            this.connectionFactory = connectionFactory;
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
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
                HostCourses hostCourses = new HostCourses();
                hostCourses = hostCourseServices.GetHostCourse(obj).SingleOrDefault();

                if (hostCourses.ImageExt != null && hostCourses.ImageExt != "")
                {
                    var imageName = hostCourses.ImageName + "." + hostCourses.ImageExt;
                    var uploads = Path.Combine(_environment.WebRootPath, "Images");
                    hostCourses.filePath = Path.Combine(_environment.WebRootPath, "Images" + "\\" + imageName + "");
                    FileInfo fi = new FileInfo(uploads + "\\" + imageName + "");
                    hostCourses.ImageExt = fi.Extension.Replace(".", string.Empty);
                    hostCourses.ImageName = imageName;
                    Byte[] b;
                    b = System.IO.File.ReadAllBytes(hostCourses.filePath);
                    hostCourses.ImageUrl = "data:image/" + hostCourses.ImageExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                }

                List<HostCourses> list = new List<HostCourses>();
                list.Add(hostCourses);
                return await Task.FromResult(list);

            }
        }


        [HttpGet("GetCourseUpdateDetails")]
        [Obsolete]
        public async Task<List<HostCourses>> UpdateCourse([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                HostCourses hostCourses = new HostCourses();
                hostCourses = hostCourseServices.UpdateCourse(obj).SingleOrDefault();

                if (hostCourses.ImageExt != null && hostCourses.ImageExt != "")
                {
                    var imageName = hostCourses.ImageName + "." + hostCourses.ImageExt;
                    var uploads = Path.Combine(_environment.WebRootPath, "Images");
                    hostCourses.filePath = Path.Combine(_environment.WebRootPath, "Images" + "\\" + imageName + "");
                    FileInfo fi = new FileInfo(uploads + "\\" + imageName + "");
                    hostCourses.ImageExt = fi.Extension.Replace(".", string.Empty);
                    hostCourses.ImageName = imageName;
                    Byte[] b;
                    b = System.IO.File.ReadAllBytes(hostCourses.filePath);
                    hostCourses.ImageUrl = "data:image/" + hostCourses.ImageExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                }

                List<HostCourses> list = new List<HostCourses>();
                list.Add(hostCourses);
                return await Task.FromResult(list);

            }
        }

        [HttpGet("GetBrouchure")]
        [Obsolete]
        public async Task<List<GetBrouchure>> GetHostBrouchure([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                GetBrouchure hostCourses = new GetBrouchure();
                hostCourses = hostCourseServices.GetHostBrouchure(obj).SingleOrDefault();

                if (hostCourses.BrochureExt != null && hostCourses.BrochureExt != "")
                {
                    var brochureName = hostCourses.BrochureName + "." + hostCourses.BrochureExt;
                    var uploads = Path.Combine(_environment.WebRootPath, "Brochure");
                    hostCourses.filePath = Path.Combine(_environment.WebRootPath, "Brochure" + "\\" + brochureName + "");
                    FileInfo fi = new FileInfo(uploads + "\\" + brochureName + "");
                    hostCourses.BrochureExt = fi.Extension.Replace(".", string.Empty);
                    hostCourses.BrochureName = brochureName;
                    Byte[] b;
                    b = System.IO.File.ReadAllBytes(hostCourses.filePath);
                    if (hostCourses.BrochureExt=="pdf")
                    {
                        hostCourses.ImageUrl = "data:application/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                    }
                    else
                    {
                        hostCourses.ImageUrl = "data:image/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                    }
                    
                }

                List<GetBrouchure> list = new List<GetBrouchure>();
                list.Add(hostCourses);
                return await Task.FromResult(list);

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
        [HttpGet("GetCourse")]
        [Obsolete]
        public async Task<List<HostCourses>> GetCourse([FromQuery] HostParameter obj)
        {
            using (var hostCourseServices = new HostCourseServices(connectionFactory))
            {
                return await Task.FromResult(hostCourseServices.GetCourse(obj));

            }
        }

        [HttpPost("UploadImage")]
        [Obsolete]
        public IActionResult UploadImage(string id)
        {
            try
            {
                var file = Request.Form.Files["UploadedImage"];
                var folderName = Path.Combine(_environment.WebRootPath, "Images");
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
        [Obsolete]
        public IActionResult UploadFile(string id)
        {
            try
            {
                var file = Request.Form.Files["UploadedBrochure"];
                var folderName = Path.Combine(_environment.WebRootPath, "Brochure");
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
    }
}
