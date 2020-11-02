using Dapper;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace SmartIndia.Data.Services.Host
{
    public class HostPlanServices : RepositoryBase
    {
        string retMsg;
        public HostPlanServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }

        [Obsolete]
        public List<GetHostplan> HostPlan()
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE","F"
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetHostplan>("USP_GetHostPlan", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetHostplan> Hostplans = new List<GetHostplan>();
                foreach (var item in result)
                {
                    var modal = new GetHostplan()
                    {
                        PlanName = item.PlanName,
                        NoofAttendee = item.NoofAttendee,
                        EmailSupport = item.EmailSupport,
                        PhoneSupport = item.PhoneSupport,
                        CoursePromotion = item.CoursePromotion,
                        ContentServices = item.ContentServices,
                        ProfileManagement = item.ProfileManagement,
                        SelectionSupport = item.SelectionSupport,
                        PlanAmount = item.PlanAmount,
                        HostPlanId = item.HostPlanId,
                    };
                    Hostplans.Add(modal);
                }
                return Hostplans;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
