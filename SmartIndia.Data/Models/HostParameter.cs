using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Models
{
    public class HostParameter
    {
       
        public Int64 UserId { get; set; }
        public string ACTIONCODE { get; set; }
        
    }
    public class UpdateHostParameter
    {
       
        public Int64 SchedularId { get; set; }
        public string ACTIONCODE { get; set; }

    }
    public class getHostRecSchedularParameter
    {
    
        public Int64 UserId { get; set; }
        public Int64 CourseId { get; set; }
        public string ACTIONCODE { get; set; }
        public int IsPublished { get; set; }
        public DateTime StartScheduleDate { get; set; }
        public DateTime EndScheduleDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

    }
}
