using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Entities.Host
{
    public class GetReschedulingDetails
    {
        [Key]
        public string ACTIONCODE { get; set; }
        public Int64 SchedularId { get; set; }
        public Int64 UserId { get; set; }
        public Int64 CourseId { get; set; }
        public string CourseName { get; set; }
        public string ScheduleDate { get; set; }
        public string Duration { get; set; }
        public string BatchName { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string ClassRoomPwd { get; set; }
        public bool IsDeleted { get; set; }
        public Int64 UpdatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool Status { get; set; }
    }
    public class HostSchedularCancel
    {
        [Key]
        public string ACTIONCODE { get; set; }
        public Int64 SchedularId { get; set; }
        public string Remarks { get; set; }
        public int RescheduleOrCancel { get; set; }
        public bool IsDeleted { get; set; }
        public Int64 UpdatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool Status { get; set; }
    }
}
