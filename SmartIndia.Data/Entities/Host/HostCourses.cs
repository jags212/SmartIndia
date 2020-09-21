using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Entities.Host
{
    public class HostCourses
    {
        [Key]
        public Int64 CourseId { get; set; }
        public Int64 UserId { get; set; }
        public string ACTIONCODE { get; set; }
        public string CourseName { get; set; }
        public string CourseDesc { get; set; }
        public string Topics { get; set; }
        public string Topic { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Duration { get; set; }
        public string ClassFrequency { get; set; }
        public int NoOfClass { get; set; }
        public decimal Cost { get; set; }
        public bool IsDeleted { get; set; }
        public Int64 UpdatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool Status { get; set; }
        public int CurrencyId { get; set; }
        public string ImageExt { get; set; }
        public string BrochureExt { get; set; }


    }
}
