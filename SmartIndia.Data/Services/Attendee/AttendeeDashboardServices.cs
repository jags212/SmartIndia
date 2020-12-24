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
    public class AttendeeDashboardServices : RepositoryBase
    {


        string retMsg;
        public AttendeeDashboardServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }

        [Obsolete]
        public List<GetCourseandNoofclass> GetCourseAndNoOfClass(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetCourseandNoofclass>("USP_AttendeeCourseAndSubject", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetCourseandNoofclass> GetAttendeesDetails = new List<GetCourseandNoofclass>();
                foreach (var item in result)
                {
                    var modal = new GetCourseandNoofclass()
                    {
                        CourseName = item.CourseName,
                        NoOfClass = item.NoOfClass,
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

        public List<GetNoofHost> BindHostDatewise(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE//H
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetNoofHost>("USP_AttendeeCourseAndSubject", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetNoofHost> GetAttendeesDetails = new List<GetNoofHost>();
                foreach (var item in result)
                {
                    var modal = new GetNoofHost()
                    {
                        NoOfHost = item.NoOfHost,
                        JoinDate = item.JoinDate,
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
