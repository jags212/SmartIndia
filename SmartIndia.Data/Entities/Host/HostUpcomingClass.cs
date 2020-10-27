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
        public string Uname { get; set; }
        public string BatchName { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string CourseId { get; set; }
        public string SchedularId { get; set; }

    }
    public class UpcomingClassesDetails
    {
        public string CourseName { get; set; }
        public DateTime ScheduleDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string title { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
        public string Uname { get; set; }
        public string BatchName { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string CourseId { get; set; }
        public string SchedularId { get; set; }
        public string ImageExt { get; set; }
        public string ImageName { get; set; }
        public string BrochureExt { get; set; }
        public string BrochureName { get; set; }
        public string filePath { get; set; }
        public string ImageUrl { get; set; }
        public string BrouchureUrl { get; set; }

    }
    public class UpcomingClassCalender
    { 
        public string title { get; set; }
        public string start { get; set; }
        public string ScheduleDate { get; set; }
        public string end { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Uname { get; set; }
        public string BatchName { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string CourseId { get; set; }
        public string SchedularId { get; set; }
        public string color { get; set; }
        public string url { get; set; }
        public string NoOfData { get; set; }
    }
    public class UpcomingClassDetails
    {
        public string CourseName { get; set; }
        public string start { get; set; }
        public string ScheduleDate { get; set; }
        public string end { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Uname { get; set; }
        public string BatchName { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string CourseId { get; set; }
        public string SchedularId { get; set; }
        public string ImageExt { get; set; }
        public string ImageName { get; set; }
        public string BrochureExt { get; set; }
        public string BrochureName { get; set; }
        public string filePath { get; set; }
        public string ImageUrl { get; set; }
        public string BrouchureUrl { get; set; }
        public string NoOfData { get; set; }
    }
}
