using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartIndia.Data.Entities.UserManagement
{
    public class UserRegistration
    {
        [Key]
        public Int64 UserId { get; set; }
        public string ACTIONCODE { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileName { get; set; }
        public string EmailId { get; set; }
        public bool EmailConfirmed { get; set; }
        public string MobileNo { get; set; }
        public bool MobileConfirmed { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string VCode { get; set; }
        public Guid UID { get; set; }
        public DateTime UserTimeZone { get; set; }
        public string MobileCountryCode { get; set; }
        public int SignUpBy { get; set; }
        public string UserNo { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Int64 UpdatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool Status { get; set; }
        public string ServiceURL { get; set; }
        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    } 
    public class UserRegistrationDetails
    {
        public string ACTIONCODE { get; set; }
        public Int64 UserId { get; set; } 
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileName { get; set; }
        public string EmailId { get; set; }
        public bool EmailConfirmed { get; set; }
        public string MobileNo { get; set; }
        public bool MobileConfirmed { get; set; } 
        public string VCode { get; set; }
        public Guid UID { get; set; }
        public DateTime UserTimeZone { get; set; }
        public string MobileCountryCode { get; set; }
        public int CountryId { get; set; }
        public Int64? PIN { get; set; }
        public string City { get; set; }
        public string Gender { get; set; } 
        public DateTime? DOB { get; set; } 
        public bool IsEmailPrivate { get; set; }
        public bool IsMobilePrivate { get; set; } 
    }
}
