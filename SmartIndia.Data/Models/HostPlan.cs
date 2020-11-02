using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Models
{
    public class GetHostplan
    {
        public string ACTIONCODE { get; set; }
        public int HostPlanId { get; set; }
        public int NoofAttendee { get; set; }
        public string PlanName { get; set; }
        public bool EmailSupport { get; set; }
        public bool PhoneSupport { get; set; }
        public bool CoursePromotion { get; set; }
        public bool ContentServices { get; set; }
        public bool ProfileManagement { get; set; }
        public bool SelectionSupport { get; set; }
        public string PlanAmount { get; set; }
        public bool Status { get; set; }
    }
}
