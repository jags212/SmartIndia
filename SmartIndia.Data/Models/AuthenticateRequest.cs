﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string EmailID { get; set; }

        [Required]
        public string Password { get; set; }
    }
    public class AuthenticateRequestByEmail
    {
        [Required]
        public string ACode { get; set; } 
    }
}
