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
    public class ResetParam
    {
        public string EmailId { get; set; }
        public string Password { get; set; }
    }
}
