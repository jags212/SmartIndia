using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Models
{
    public class HostParameter
    {
        [Key]
        public Int64 UserId { get; set; }
        public string ACTIONCODE { get; set; }
    }
}
