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
                        start = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd") +"T"+ item.StartTime+":00",
                        end = "",
                        StartTime = item.StartTime,
                        EndTime = item.EndTime
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
    }
}
