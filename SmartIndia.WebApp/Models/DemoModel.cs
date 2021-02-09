using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartIndia.WebApp.Models
{
    public class DemoModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Amount { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string ProductInfo { get; set; }
        public string Email { get; set; }
    }
}
