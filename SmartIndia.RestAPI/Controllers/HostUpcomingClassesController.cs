using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using SmartIndia.Data.Services.Host;

namespace SmartIndia.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostUpcomingClassesController : ControllerBase
    {
        private readonly IConnectionFactory connectionFactory;
        [Obsolete]
        private readonly IHostingEnvironment _environment;
        private readonly IConfiguration _configuration;

        [Obsolete]
        public HostUpcomingClassesController(IConnectionFactory connectionFactory, IHostingEnvironment environment, IConfiguration configuration)
        {
            this.connectionFactory = connectionFactory;
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
            _configuration = configuration;
        }

        [HttpGet("BindHostUpcommingClasses")]
        [Obsolete]
        public async Task<List<UpcomingClassCalender>> BindUpcommingClasses([FromQuery] HostParameter obj)
        {
            obj.Curl = _configuration.GetSection("HostURL")["ClientURL"];
            using (var hostUpcommingClassesServices = new HostUpcommingClassesServices(connectionFactory))
            {
                return await Task.FromResult(hostUpcommingClassesServices.BindUpcommingClasses(obj));

            }
        }
        [HttpGet("HostUpcommingClassDetail")]
        [Obsolete]
        public async Task<List<UpcomingClassDetails>> BindUpcommingClassDetail([FromQuery] HostParameterCourseDetail obj)
        {
            using (var hostCourseServices = new HostUpcommingClassesServices(connectionFactory))
            {
                UpcomingClassDetails hostCourses = new UpcomingClassDetails();
                hostCourses = hostCourseServices.BindUpcommingClassDetail(obj).SingleOrDefault();

                if (hostCourses.ImageExt != null && hostCourses.ImageExt != "")
                {
                    var imageName = hostCourses.ImageName + "." + hostCourses.ImageExt;
                    var uploads = Path.Combine(_environment.WebRootPath, "Images");
                    hostCourses.filePath = Path.Combine(_environment.WebRootPath, "Images" + "\\" + imageName + "");
                    FileInfo fi = new FileInfo(uploads + "\\" + imageName + "");
                    hostCourses.ImageExt = fi.Extension.Replace(".", string.Empty);
                    hostCourses.ImageName = imageName;
                    Byte[] b;
                    if (System.IO.File.Exists(hostCourses.filePath))
                    {
                        b = System.IO.File.ReadAllBytes(hostCourses.filePath);
                        hostCourses.ImageUrl = "data:image/" + hostCourses.ImageExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                    }
                    else
                    {
                        hostCourses.ImageUrl = "";
                    }
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
                    if (System.IO.File.Exists(hostCourses.filePath))
                    {
                        b = System.IO.File.ReadAllBytes(hostCourses.filePath);
                        if (hostCourses.BrochureExt == "pdf")
                        {
                            hostCourses.BrouchureUrl = "data:application/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                        }
                        else
                        {
                            hostCourses.BrouchureUrl = "data:image/" + hostCourses.BrochureExt + ";base64," + Convert.ToBase64String(b, 0, b.Length); ;
                        }
                    }
                    else
                    {
                        hostCourses.BrouchureUrl = "";
                    }
                }
                List<UpcomingClassDetails> list = new List<UpcomingClassDetails>();
                list.Add(hostCourses);
                return await Task.FromResult(list);
            }
        }
    }
}
