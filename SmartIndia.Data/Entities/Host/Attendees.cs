﻿using System;
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
    // Attendee wise course
    public class GetAWC 
    {
        public string ACTIONCODE { get; set; }
        public Int64 UserId { get; set; }
        public Int64 CourseId { get; set; }
        public string CourseName { get; set; }
        public DateTime StartDate { get; set; }
        public string NoOfCourses { get; set; }
    }
}
