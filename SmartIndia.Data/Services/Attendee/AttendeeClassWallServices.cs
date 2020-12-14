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
        public ClassWallCalender_New BindClassWallCallendar(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            ClassWallCalender_New classWallCalender_New = new ClassWallCalender_New();
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
                //return classwallCalender;
                classWallCalender_New.retOut = "Success";
                classWallCalender_New.status = "200";
                classWallCalender_New.classWallCalenders = classwallCalender;
            }
            catch (Exception ex)
            {
               
                classWallCalender_New.retOut = ex.Message;
                classWallCalender_New.status = "500";
                classWallCalender_New.classWallCalenders = null;
            }
            return classWallCalender_New;
        }

        [Obsolete]
        public ClassWallClassDetails_New BindClassWallDetail(HostParameterCourseDetail hostParameterCourseDetail)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE","E",
                     "@UserId",hostParameterCourseDetail.UserId,
                     "@SchedularId",hostParameterCourseDetail.SchedularId
            };
            ClassWallClassDetails_New classWallClassDetails_New = new ClassWallClassDetails_New();
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
                classWallClassDetails_New.retOut = "Success";
                classWallClassDetails_New.status = "200";
                classWallClassDetails_New.classWallClassDetails = classWallDetails;
            }
            catch (Exception ex)
            {
                classWallClassDetails_New.retOut = ex.Message;
                classWallClassDetails_New.status = "500";
                classWallClassDetails_New.classWallClassDetails = null;
            }
            return classWallClassDetails_New;
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
                    retOut = "",
                    status = "500"
                };
            }
            return retParamMsg;
        }
    }
}
