using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Entities
{
    public class ReturnParam
    {
        public string retOut { get; set; }
        public string userID { get; set; }
    }
    public class ReturnParamMsg
    {
        public string retOut { get; set; }
        public string status { get; set; }
    }public class ReturnBoolParam
    {
        public bool retOut { get; set; }
        public string status { get; set; }
    }
    public class HostCourseReturnParam
    {
        public string retOut { get; set; }
        public string ImgName { get; set; }
        public string BroName { get; set; }
    }
    public class ResetParam
    {
        public string EmailId { get; set; }
        public string Password { get; set; }
    }
}
