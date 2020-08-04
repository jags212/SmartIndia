using Newtonsoft.Json;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Models
{
    public class AuthenticateResponse
    {
        public Int64 Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailID { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(UserRegistration userRegistration, string jwtToken, string refreshToken)
        {
            Id = userRegistration.UserId;
            FirstName = userRegistration.FirstName;
            LastName = userRegistration.LastName;
            EmailID = userRegistration.EmailId;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
