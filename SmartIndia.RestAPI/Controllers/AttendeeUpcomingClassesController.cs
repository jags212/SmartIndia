using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Attendee;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeUpcomingClassesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;

        [Obsolete]
        private readonly IHostingEnvironment _environment;

        [Obsolete]
        public AttendeeUpcomingClassesController(IConnectionFactory connectionFactory, IHostingEnvironment environment)
        {
            this.connectionFactory = connectionFactory;
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        [HttpGet("AttendeeUpcomingClass")]
        [Obsolete]
        public async Task<List<UpcomingClassCalender>> BindUpcommingClasses([FromQuery] HostParameter obj)
        {
            using (var attendeeUpcommingClassesServices = new AttendeeUpcommingClassesServices(connectionFactory))
            {
                return await Task.FromResult(attendeeUpcommingClassesServices.BindUpcommingClasses(obj));

            }
        }
        [HttpGet("AttendeeUpcommingClassDetail")]
        [Obsolete]
        public async Task<List<UpcomingClassDetails>> BindUpcommingClassDetail([FromQuery] HostParameterCourseDetail obj)
        {
            using (var attendeeUpcommingClassesServices = new AttendeeUpcommingClassesServices(connectionFactory))
            {
                UpcomingClassDetails hostCourses = new UpcomingClassDetails();
                hostCourses = attendeeUpcommingClassesServices.BindUpcommingClassDetail(obj).SingleOrDefault();

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
                    hostCourses.BrouchureUrl = "data:image/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                }
                List<UpcomingClassDetails> list = new List<UpcomingClassDetails>();
                list.Add(hostCourses);
                return await Task.FromResult(list);
            }

            //using (var attendeeUpcommingClassesServices = new AttendeeUpcommingClassesServices(connectionFactory))
            //{
            //    return await Task.FromResult(attendeeUpcommingClassesServices.BindUpcommingClassDetail(obj));

            //}
        }
    }
}
