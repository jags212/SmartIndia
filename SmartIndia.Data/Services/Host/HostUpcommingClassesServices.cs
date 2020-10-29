using Dapper;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace SmartIndia.Data.Services.Host
{
   public class HostUpcommingClassesServices :RepositoryBase
    {
        public HostUpcommingClassesServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        [Obsolete]
        public List<UpcomingClassCalender> BindUpcommingClasses(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetHostUpcomingClassesDetails>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<UpcomingClassCalender> pcomingClassCalender = new List<UpcomingClassCalender>();
                foreach (var item in result)
                {
                    var modal = new UpcomingClassCalender()
                    {
                        title = item.CourseName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd"),
                        start = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd") +"T"+ item.StartTime+":00",
                        end = "",
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        Uname = item.Uname,
                        BatchName = item.BatchName,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId=item.CourseId,
                        ClassRoomId = item.ClassRoomId.ToString(),
                        SchedularId = item.SchedularId,
                        color = "#ffc107",
                        url = hostParameter.Curl + "/Hosts/UpcomingClasses/upcomingclassdetail?SID=" + item.SchedularId + "",
                        NoOfData = result.Count.ToString()

                    };
                    pcomingClassCalender.Add(modal);
                }
                return pcomingClassCalender;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Obsolete]
        public List<UpcomingClassDetails> BindUpcommingClassDetail(HostParameterCourseDetail hostParameterCourseDetail)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameterCourseDetail.ACTIONCODE,
                     "@UserId",hostParameterCourseDetail.UserId,
                     "@SchedularId",hostParameterCourseDetail.SchedularId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<UpcomingClassesDetails>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<UpcomingClassDetails> upcomingClassDetails = new List<UpcomingClassDetails>();
                foreach (var item in result)
                {
                    var modal = new UpcomingClassDetails()
                    {
                        CourseName = item.CourseName,
                        ScheduleDate =TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd"),
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
                        BrochureExt = item.BrochureExt

                    };
                    upcomingClassDetails.Add(modal);
                }
                return upcomingClassDetails;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
