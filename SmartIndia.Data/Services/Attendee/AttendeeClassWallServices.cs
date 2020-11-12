using Dapper;
using SmartIndia.Data.Entities;
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
   public class AttendeeClassWallServices: RepositoryBase
    {
        ReturnParamMsg retParamMsg = new ReturnParamMsg();
        string retMsg;
        public AttendeeClassWallServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        [Obsolete]
        public List<ClassWallCalender> BindClassWallCallendar(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<ClassWallsCalender>("USP_AttendeeUpcomingClasses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<ClassWallCalender> classwallCalender = new List<ClassWallCalender>();
                foreach (var item in result)
                {
                    var modal = new ClassWallCalender()
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
                        color = "#ffc107",
                        url = hostParameter.Curl + "/Attendee/ClassWall/ClassWallDetail?SID=" + item.SchedularId + "",
                        NoOfData = result.Count.ToString()


                    };
                    classwallCalender.Add(modal);
                }
                return classwallCalender;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Obsolete]
        public List<ClassWallClassDetails> BindClassWallDetail(HostParameterCourseDetail hostParameterCourseDetail)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE","E",
                     "@UserId",hostParameterCourseDetail.UserId,
                     "@SchedularId",hostParameterCourseDetail.SchedularId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<ClassWallsClassDetails>("USP_AttendeeUpcomingClasses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<ClassWallClassDetails> classWallDetails = new List<ClassWallClassDetails>();
                foreach (var item in result)
                {
                    var modal = new ClassWallClassDetails()
                    {
                        title = item.CourseName,
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
                        IsPublished = item.IsPublished,
                        NoOfData = result.Count.ToString(),
                        ClassType = item.ClassType,
                        Status = item.Status,

                    };
                    classWallDetails.Add(modal);
                }
                return classWallDetails;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public ReturnParamMsg UpdateUserRole( Int64 Userid)
        {
            object[] objArray = new object[] {
                         "@UserId", Userid
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UpdateUserRoleId", param, commandType: CommandType.StoredProcedure);
                retMsg = param.Get<string>("PVCH_MSGOUT");
                retParamMsg = new ReturnParamMsg
                {
                    retOut = retMsg,
                    status = "200"
                };
            }
            catch (Exception ex)
            {
                retParamMsg = new ReturnParamMsg
                {
                    retOut = retMsg,
                    status = "500"
                };
            }
            return retParamMsg;
        }
    }
}
