using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Entities.Host
{
    public class GetAttendees
    {
        public string ACTIONCODE { get; set; }
        public Int64 UserId { get; set; }
        public Int64 CourseId { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public string NoOfAttendee { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
    }
    public class GetCourseandNoofclass
    {
        public string ACTIONCODE { get; set; }
        public string CourseName { get; set; }
        public string NoOfClass { get; set; }
    }
    public class GetNoofHost
    {
        public string ACTIONCODE { get; set; }
        public DateTime JoinDate { get; set; }
        public string NoOfHost { get; set; }
    }
    // Attendee wise course
    public class GetAWC 
    {
        public string ACTIONCODE { get; set; }
        public Int64 UserId { get; set; }
        public Int64 CourseId { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public string NoOfCourses { get; set; }
        public string Hostname { get; set; }
    }
    public class GetCWA
    {
        public string FirstName { get; set; }
        public string UserId { get; set; }
    }
    public class GetCoursedetails
    {
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
