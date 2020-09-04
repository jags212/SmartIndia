using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Entities.Host
{
    public class GetHostUpcomingClassesDetails
    {
        public string CourseName { get; set; }
        public DateTime ScheduleDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string title { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
    }
    public class UpcomingClassCalender
    { 
        public string title { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
