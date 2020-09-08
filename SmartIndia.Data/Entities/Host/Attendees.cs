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
    }
}
