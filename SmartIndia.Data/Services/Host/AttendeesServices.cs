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
   public  class AttendeesServices : RepositoryBase
    {
        string retMsg;
        public AttendeesServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }

        [Obsolete]
        public List<GetAttendees> BindAttendees(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetAttendees>("USP_ATTENDEEDETAILS_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetAttendees> GetAttendeesDetails = new List<GetAttendees>();
                foreach (var item in result)
                {
                    var modal = new GetAttendees()
                    {
                        CourseId = item.CourseId,
                        UserId = item.UserId,
                        CourseName = item.CourseName,
                        StartDate = TimeZone.CurrentTimeZone.ToLocalTime(item.StartDate),
                        NoOfAttendee = item.NoOfAttendee,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                    };
                    GetAttendeesDetails.Add(modal);
                }
                return GetAttendeesDetails;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [Obsolete]
        public List<GetAWC> BindAWC(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetAWC>("USP_ATTENDEEDETAILS_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetAWC> AWCDETAILS = new List<GetAWC>();
                foreach (var item in result)
                {
                    var modal = new GetAWC()
                    {
                        Hostname = item.Hostname,
                        UserId = item.UserId,
                        NoOfCourses = item.NoOfCourses,
                    };
                    AWCDETAILS.Add(modal);
                }
                return AWCDETAILS;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public List<GetCWA> BindCWA(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@CourseId",hostParameter.CourseId,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetCWA>("USP_ATTENDEEDETAILS_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetCWA> AWCDETAILS = new List<GetCWA>();
                foreach (var item in result)
                {
                    var modal = new GetCWA()
                    {
                        FirstName = item.FirstName,
                        UserId = item.UserId
                    };
                    AWCDETAILS.Add(modal);
                }
                return AWCDETAILS;


            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<GetCoursedetails> BindAttendeeCourseDetails(CourseWiseAttendee courseWiseAttendee)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",courseWiseAttendee.ACTIONCODE,
                     "@AttendeeId",courseWiseAttendee.AttendeeId,
                     "@UserId",courseWiseAttendee.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetCoursedetails>("USP_ATTENDEEDETAILS_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetCoursedetails> AWCDETAILS = new List<GetCoursedetails>();
                foreach (var item in result)
                {
                    var modal = new GetCoursedetails()
                    {
                        CourseName = item.CourseName,
                        StartDate = item.StartDate,
                        EndDate = item.EndDate
                    };
                    AWCDETAILS.Add(modal);
                }
                return AWCDETAILS;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

}
