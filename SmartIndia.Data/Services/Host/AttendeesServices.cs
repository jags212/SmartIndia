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
    }

}
