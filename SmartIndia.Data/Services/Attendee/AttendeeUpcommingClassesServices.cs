using Dapper;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace SmartIndia.Data.Services.Attendee
{
   public class AttendeeUpcommingClassesServices :RepositoryBase
    {
        public AttendeeUpcommingClassesServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        [Obsolete]
        public UpcomingClassCalender_New BindUpcommingClasses(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            UpcomingClassCalender_New upcomingClassCalender_New = new UpcomingClassCalender_New();
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetHostUpcomingClassesDetails>("USP_AttendeeUpcomingClasses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<UpcomingClassCalender> pcomingClassCalender = new List<UpcomingClassCalender>();
                foreach (var item in result)
                {
                    var modal = new UpcomingClassCalender()
                    {
                        title = item.CourseName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd"),
                        start = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd") + "T" + item.StartTime + ":00",
                        end = "",
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        Uname = item.Uname,
                        BatchName = item.BatchName,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId = item.CourseId,
                        SchedularId = item.SchedularId,
                        ClassRoomId = item.ClassRoomId.ToString(),
                        color = "#ffc107",
                        url = hostParameter.Curl + "/Attendee/UpcomingClasses/upcomingclassdetail?SID=" + item.SchedularId + "",
                        NoOfData=result.Count.ToString()

                    };
                    pcomingClassCalender.Add(modal);
                }
                upcomingClassCalender_New.retOut = "Success";
                upcomingClassCalender_New.status = "200";
                upcomingClassCalender_New.upcomingClassCalenders = pcomingClassCalender;
            }
            catch (Exception ex)
            {
                upcomingClassCalender_New.retOut = ex.Message;
                upcomingClassCalender_New.status = "500";
                upcomingClassCalender_New.upcomingClassCalenders = null;
            }
            return upcomingClassCalender_New;
        }

        [Obsolete]
        public UpcomingClassDetails_New BindUpcommingClassDetail(HostParameterCourseDetail hostParameterCourseDetail)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameterCourseDetail.ACTIONCODE,
                     "@UserId",hostParameterCourseDetail.UserId,
                     "@SchedularId",hostParameterCourseDetail.SchedularId
            };
            UpcomingClassDetails_New upcomingClassDetails_New = new UpcomingClassDetails_New();
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<UpcomingClassesDetails>("USP_AttendeeUpcomingClasses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<UpcomingClassDetails> upcomingClassDetails = new List<UpcomingClassDetails>();
                foreach (var item in result)
                {
                    var modal = new UpcomingClassDetails()
                    {
                        CourseName = item.CourseName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd"),
                        start = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd") + "T" + item.StartTime + ":00",
                        end = "",
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        Uname = item.Uname,
                        BatchName = item.BatchName,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId = item.CourseId,
                        SchedularId = item.SchedularId,
                        ImageName = item.ImageName,
                        ImageExt = item.ImageExt,
                        BrochureName = item.BrochureName,
                        BrochureExt = item.BrochureExt,
                        BrouchureUrl = item.BrouchureUrl,
                        ImageUrl = item.ImageUrl

                    };
                    upcomingClassDetails.Add(modal);
                }
                upcomingClassDetails_New.retOut = "Success";
                upcomingClassDetails_New.status = "200";
                upcomingClassDetails_New.upcomingClassDetails = upcomingClassDetails;
            }
            catch (Exception ex)
            {
                upcomingClassDetails_New.retOut = ex.Message;
                upcomingClassDetails_New.status = "500";
                upcomingClassDetails_New.upcomingClassDetails = null;
            }
            return upcomingClassDetails_New;
        }
    }
}
