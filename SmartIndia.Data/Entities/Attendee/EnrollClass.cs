using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Entities.Attendee
{
    public class AttendeeEnrollclass
    {
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Uname { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string Duration { get; set; }
        public string ClassFrequency { get; set; }
        public string NoOfClass { get; set; }
        public string Cost { get; set; }
        public string BatchName { get; set; }
        public string AttendeeUserId { get; set; }
        public string url { get; set; }

    }
    public class AttendeeEnrollclasses
    {
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Uname { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string Duration { get; set; }
        public string ClassFrequency { get; set; }
        public string NoOfClass { get; set; }
        public string Cost { get; set; }
        public string BatchName { get; set; }
        public string url { get; set; }
        public string AttendeeUserId { get; set; }

    }
    public class EnrollClasses
    {
        public string ACTIONCODE { get; set; }
        public Int64 UserId { get; set; }
        public Int64 CourseId { get; set; }
        public string BatchName { get; set; }

    }
    public class EnrollClasseFilter
    {
        public string ACTION { get; set; }
        public string CourseName { get; set; }
        public string HostName { get; set; }
        public string DATE { get; set; }
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }

    }
}
