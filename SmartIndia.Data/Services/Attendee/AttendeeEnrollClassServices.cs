using Dapper;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.Attendee;
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
    public class AttendeeEnrollClassServices : RepositoryBase
    {
        ReturnBoolParam retBoolParamMsg = new ReturnBoolParam();
        ReturnParamMsg retParamMsg = new ReturnParamMsg();
        public string retMsg;
        public AttendeeEnrollClassServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        [Obsolete]
        public AttendeeEnrollclasses_New BindCourses(AttendeeParameterEnrolclass attendeeParameterEnrolclass)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",attendeeParameterEnrolclass.ACTIONCODE
            };
            AttendeeEnrollclasses_New enrollclasses_New = new AttendeeEnrollclasses_New();
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<AttendeeEnrollclass>("USP_GetHostCourses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<AttendeeEnrollclasses> Enrollclasses = new List<AttendeeEnrollclasses>();
                foreach (var item in result)
                {
                    var modal = new AttendeeEnrollclasses()
                    {
                        CourseName = item.CourseName,
                        StartDate = TimeZone.CurrentTimeZone.ToLocalTime(item.StartDate).ToString("yyyy-MM-dd"),
                        EndDate = TimeZone.CurrentTimeZone.ToLocalTime(item.EndDate).ToString("yyyy-MM-dd"),
                        Uname = item.Uname,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId = item.CourseId,
                        Duration = item.Duration,
                        ClassFrequency = item.ClassFrequency,
                        NoOfClass = item.NoOfClass,
                        Cost = item.Cost,
                        BatchName = item.BatchName,
                        AttendeeUserId = item.AttendeeUserId,
                        url = attendeeParameterEnrolclass.Curl + "/Hosts/UpcomingClasses/upcomingclassdetail?SID=" + item.CourseId + "",
                        NoOfData=result.Count.ToString()

                    };
                    Enrollclasses.Add(modal);
                }
                enrollclasses_New.retOut = "Success";
                enrollclasses_New.status = "200";
                enrollclasses_New.attendeeEnrollclasses = Enrollclasses;
                
            }
            catch (Exception ex)
            {
                enrollclasses_New.retOut = ex.Message;
                enrollclasses_New.status = "500";
                enrollclasses_New.attendeeEnrollclasses = null;
            }
            return enrollclasses_New;
        }

        [Obsolete]
        public HostCoursesforEnroll_New GetCoursedetail(HostEnrollcourse hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,//D
                     "@CourseId",hostParameter.CourseId,
                     "@BatchName",hostParameter.BatchName
            };
            HostCoursesforEnroll_New hostCoursesforEnroll_New = new HostCoursesforEnroll_New();
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<HostCoursesforEnroll>("USP_GetHostCourses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<HostCoursesforEnroll> HostCourses = new List<HostCoursesforEnroll>();
                foreach (var item in result)
                {
                    var modal = new HostCoursesforEnroll()
                    {
                        CourseId = item.CourseId,
                        UserId = item.UserId,
                        CourseName = item.CourseName,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        StartDate = TimeZone.CurrentTimeZone.ToLocalTime(item.StartDate),
                        EndDate = TimeZone.CurrentTimeZone.ToLocalTime(item.EndDate),
                        Duration = item.Duration,
                        ClassFrequency = item.ClassFrequency,
                        NoOfClass = item.NoOfClass,
                        Cost = item.Cost,
                        Topic = item.Topic,
                        BatchName = item.BatchName,
                        Uname = item.Uname,
                        EmailId = item.EmailId,
                        MobileNo = item.MobileNo,
                        ImageName = item.ImageName,
                        ImageExt = item.ImageExt,
                        BrochureName = item.BrochureName,
                        BrochureExt = item.BrochureExt,
                        EnrolledUserId = item.EnrolledUserId
                    };
                    HostCourses.Add(modal);
                }
                hostCoursesforEnroll_New.retOut = "Success";
                hostCoursesforEnroll_New.status = "200";
                hostCoursesforEnroll_New.hostCoursesforEnrolls = HostCourses;
            }
            catch (Exception ex)
            {
                hostCoursesforEnroll_New.retOut = ex.Message;
                hostCoursesforEnroll_New.status = "500";
                hostCoursesforEnroll_New.hostCoursesforEnrolls = null;
            }
            return hostCoursesforEnroll_New;
        }
        
        public ReturnParamMsg EnrollClasses(EnrollClasses enrollClasses)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",enrollClasses.ACTIONCODE,
                     "@CourseId",enrollClasses.CourseId,
                     "@UserId",enrollClasses.UserId,
                     "@BatchName",enrollClasses.BatchName,
                     "@DeviceResources",enrollClasses.DeviceResources

            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_AttendeeEnrollCourses_ACTION", param, commandType: CommandType.StoredProcedure);
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
        public ReturnParamMsg ShowInterests(EnrollClasses enrollClasses)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",enrollClasses.ACTIONCODE,
                     "@CourseId",enrollClasses.CourseId,
                     "@UserId",enrollClasses.UserId,
                     "@BatchName",enrollClasses.BatchName

            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_CourseInterest_ACTION", param, commandType: CommandType.StoredProcedure);
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
        public ReturnParamMsg AddtoFavorites(EnrollClasses enrollClasses)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",enrollClasses.ACTIONCODE,
                     "@CourseId",enrollClasses.CourseId,
                     "@UserId",enrollClasses.UserId,
                     "@BatchName",enrollClasses.BatchName

            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_CourseFavorite_ACTION", param, commandType: CommandType.StoredProcedure);
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
                    retOut = ex.Message,
                    status = "500"
                };
            }
            return retParamMsg;
        }

        [Obsolete]
        public AttendeeEnrollclasses_New EnrollCourseFilter(EnrollClasseFilter enrollClasseFilter, string CUrl)
        {
            object[] objArray = new object[] {
                     "@ACTION",enrollClasseFilter.ACTION,
                     "@HostName",enrollClasseFilter.HostName,
                     "@CourseName",enrollClasseFilter.CourseName,
                     "@DATE",enrollClasseFilter.DATE,
                     "@MinPrice",enrollClasseFilter.MinPrice,
                     "@MaxPrice",enrollClasseFilter.MaxPrice,
                     "@UserId",enrollClasseFilter.UserId
            };
            AttendeeEnrollclasses_New enrollclasses_New = new AttendeeEnrollclasses_New();
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<AttendeeEnrollclass>("USP_GetEnrollCourse_Search", param, commandType: CommandType.StoredProcedure).ToList();
                List<AttendeeEnrollclasses> Enrollclasses = new List<AttendeeEnrollclasses>();
                foreach (var item in result)
                {
                    var modal = new AttendeeEnrollclasses()
                    {
                        CourseName = item.CourseName,
                        StartDate = TimeZone.CurrentTimeZone.ToLocalTime(item.StartDate).ToString("yyyy-MM-dd"),
                        EndDate = TimeZone.CurrentTimeZone.ToLocalTime(item.EndDate).ToString("yyyy-MM-dd"),
                        Uname = item.Uname,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId = item.CourseId,
                        Duration = item.Duration,
                        ClassFrequency = item.ClassFrequency,
                        NoOfClass = item.NoOfClass,
                        Cost = item.Cost,
                        BatchName = item.BatchName,
                        AttendeeUserId = item.AttendeeUserId,
                        url = CUrl + "/Hosts/UpcomingClasses/upcomingclassdetail?SID=" + item.CourseId + "",
                        NoOfData = result.Count.ToString()

                    };
                    Enrollclasses.Add(modal);
                }
                
                enrollclasses_New.retOut = "Success";
                enrollclasses_New.status = "200";
                enrollclasses_New.attendeeEnrollclasses = Enrollclasses;
            }
            catch (Exception ex)
            {
                enrollclasses_New.retOut = ex.Message;
                enrollclasses_New.status = "500";
                enrollclasses_New.attendeeEnrollclasses = null;
            }
            return enrollclasses_New;
        }
    }
}
