using Dapper;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Text;

namespace SmartIndia.Data.Services
{
    public class UserRegistrationServices : RepositoryBase
    {
        string retMsg = string.Empty;
        public UserRegistrationServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        public string UserRegestrationAction(UserRegistration registration)
        {
            var keyNew = Helper.GeneratePassword(10);
            var password = Helper.EncodePassword(registration.Password, keyNew);
            object[] objArray = new object[] {
                     "@P_ACTIONCODE", registration.ACTIONCODE
                    ,"@FirstName", registration.FirstName
                    ,"@LastName", registration.LastName
                    ,"@EmailId", registration.EmailId
                    ,"@MobileNo", registration.MobileNo
                    ,"@Password", password
                    ,"@VCode", keyNew
                    ,"@UID", Guid.NewGuid()
                    ,"@MobileCountryCode", registration.MobileCountryCode
                    ,"@UserNo", ""
                    ,"@UpdatedById", string.Empty 
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@UserTimeZone", DateTime.UtcNow, DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Execute("USP_UserRegistrations_ACTION", param, commandType: CommandType.StoredProcedure);
                retMsg = param.Get<string>("PVCH_MSGOUT");

            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = "400";
               // log.Error(ex);
            }
            return retMsg;
        }
    }
}
