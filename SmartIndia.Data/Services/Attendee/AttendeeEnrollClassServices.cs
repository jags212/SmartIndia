using Dapper;
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
        public string retMsg;
        public AttendeeEnrollClassServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        [Obsolete]
        public List<AttendeeEnrollclasses> BindCourses(AttendeeParameterEnrolclass attendeeParameterEnrolclass)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",attendeeParameterEnrolclass.ACTIONCODE
            };
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
                return Enrollclasses;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Obsolete]
        public List<HostCoursesforEnroll> GetCoursedetail(HostEnrollcourse hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@CourseId",hostParameter.CourseId,
                     "@BatchName",hostParameter.BatchName
            };
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
                        BrochureExt = item.BrochureExt
                    };
                    HostCourses.Add(modal);
                }
                return HostCourses;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string EnrollClasses(EnrollClasses enrollClasses)
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
                var result = DBConnection.Execute("USP_AttendeeEnrollCourses_ACTION", param, commandType: CommandType.StoredProcedure);
                retMsg = param.Get<string>("PVCH_MSGOUT");
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = "";
                // log.Error(ex);
            }
            return retMsg;
        }
        public string ShowInterests(EnrollClasses enrollClasses)
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
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = "";
                // log.Error(ex);
            }
            return retMsg;
        }
        public string AddtoFavorites(EnrollClasses enrollClasses)
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
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = "";
                // log.Error(ex);
            }
            return retMsg;
        }

        [Obsolete]
        public List<AttendeeEnrollclasses> EnrollCourseFilter(EnrollClasseFilter enrollClasseFilter, string CUrl)
        {
            object[] objArray = new object[] {
                     "@ACTION",enrollClasseFilter.ACTION,
                     "@HostName",enrollClasseFilter.HostName,
                     "@CourseName",enrollClasseFilter.CourseName,
                     "@DATE",enrollClasseFilter.DATE,
                     "@MinPrice",enrollClasseFilter.MinPrice,
                     "@MaxPrice",enrollClasseFilter.MaxPrice
            };
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
                return Enrollclasses;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
