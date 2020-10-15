using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartIndia.Data.Entities.Attendee;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Attendee;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeEnrolcoursesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;
        [Obsolete]
        private readonly IHostingEnvironment _environment;
        private readonly IConfiguration _configuration;

        [Obsolete]
        public AttendeeEnrolcoursesController(IConnectionFactory connectionFactory, IHostingEnvironment environment, IConfiguration configuration)
        {
            this.connectionFactory = connectionFactory;
            _environment = environment ?? throw new ArgumentNullException(nameof(environment)); 
            _configuration = configuration;
        }
        [HttpGet("AttendeeEnrollclass")]
        [Obsolete]
        public async Task<List<AttendeeEnrollclasses>> BindCourses([FromQuery] AttendeeParameterEnrolclass obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.BindCourses(obj));

            }
        }
        [HttpGet("GetCoursedetails")]
        [Obsolete]
        public async Task<List<HostCoursesforEnroll>> GetCoursedetail([FromQuery] HostEnrollcourse obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                HostCoursesforEnroll hostCourses = new HostCoursesforEnroll();
                hostCourses = attendeeEnrollClassServices.GetCoursedetail(obj).SingleOrDefault();
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
                    if (hostCourses.BrochureExt == "pdf")
                    {
                        hostCourses.BrochureUrl = "data:application/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                    }
                    else
                    {
                        hostCourses.BrochureUrl = "data:image/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                    }
                    //hostCourses.BrochureUrl = "data:image/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                }
                List<HostCoursesforEnroll> list = new List<HostCoursesforEnroll>();
                list.Add(hostCourses);
                return await Task.FromResult(list);
            }
        }
        [HttpPost("EnrollClass")]
        public async Task<string> EnrollClasses(EnrollClasses obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.EnrollClasses(obj));
            }
        }
        [HttpPost("ShowInterest")]
        public async Task<string> ShowInterests(EnrollClasses obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.ShowInterests(obj));
            }
        }
        [HttpPost("AddtoFavorite")]
        public async Task<string> AddtoFavorites(EnrollClasses obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.AddtoFavorites(obj));
            }
        }
        [HttpGet("FilterEnrollCourses")]
        [Obsolete]
        public async Task<List<AttendeeEnrollclasses>> EnrollCourseFilter([FromQuery]EnrollClasseFilter obj)
        {
            using (var attendeeEnrollClassServices = new AttendeeEnrollClassServices(connectionFactory))
            {
                return await Task.FromResult(attendeeEnrollClassServices.EnrollCourseFilter(obj, _configuration.GetSection("HostURL")["ClientURL"]));
            }
        }
    }
}
