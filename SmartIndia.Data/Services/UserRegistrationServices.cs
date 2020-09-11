using Dapper;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Enums;
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
        ReturnParam retMsg = new ReturnParam();
        string strRetMsg = "";
        private readonly IConnectionFactory connectionFactory;

        public UserRegistrationServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }
        public ReturnParam UserRegestrationAction(UserRegistration registration)
        {
            try
            {
                var keyNew = Helper.GeneratePassword(10);
                var password = Helper.EncodePassword(registration.Password, keyNew);
                object[] objArray = new object[] {
                     "@P_ACTIONCODE", registration.ACTIONCODE
                    ,"@UserId", registration.UserId
                    ,"@UserName", registration.UserName
                    ,"@FirstName", registration.FirstName
                    ,"@LastName", registration.LastName
                    ,"@ProfileName", registration.ProfileName
                    ,"@EmailId", registration.EmailId
                    ,"@EmailConfirmed", registration.EmailConfirmed
                    ,"@MobileNo", registration.MobileNo
                    ,"@MobileConfirmed", registration.MobileConfirmed
                    ,"@Password", password
                    ,"@VCode", keyNew
                    ,"@UID", Guid.NewGuid()
                    ,"@MobileCountryCode", registration.MobileCountryCode
                    ,"@UserNo", ""
                    ,"@SignUpBy", registration.SignUpBy
                    ,"@UpdatedById", 0
                };

                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@UserTimeZone", DateTime.UtcNow, DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Execute("USP_UserRegistrations_ACTION", param, commandType: CommandType.StoredProcedure);
                string retSP = param.Get<string>("PVCH_MSGOUT");
                if (retSP.Contains(","))
                {
                    string[] arr = retSP.Split(',');
                    retMsg = new ReturnParam
                    {
                        retOut = arr[0],
                        userID = arr[1]
                    };
                }
                else
                {
                    retMsg = new ReturnParam
                    {
                        retOut = retSP,
                        userID = null
                    };
                }
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = retMsg = new ReturnParam
                {
                    retOut = "404",
                    userID = null
                };
                // log.Error(ex);
            }
            return retMsg;
        }
        public ReturnParam UpdateVerifiedUser(UserRegistration registration)
        {
            try
            {
                object[] objArray = new object[] {
                     "@P_ACTIONCODE", registration.ACTIONCODE
                    ,"@UserId", registration.UserId
                };

                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UserRegistrations_ACTION", param, commandType: CommandType.StoredProcedure);
                string retSP = param.Get<string>("PVCH_MSGOUT");

                retMsg = new ReturnParam
                {
                    retOut = retSP,
                    userID = null
                };
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = retMsg = new ReturnParam
                {
                    retOut = "404",
                    userID = null
                };
                // log.Error(ex);
            }
            return retMsg;
        }
        public UserRegistration CheckValidEmail(string email)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@ACTIONCODE", 'A'
                    ,"@EmailID", email
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
                var getUser = DBConnection.QueryFirstOrDefault<UserRegistration>("USP_LoginManagement_ACTION", paramUser, commandType: CommandType.StoredProcedure);

                if (getUser == null)
                {
                    return null;
                }
                else
                {
                    return getUser;
                }
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return null;
                // log.Error(ex);
            }
        }
        public string UpdareResetPassword(ResetParam resetParam)
        {
            try
            {
                var keyNew = Helper.GeneratePassword(10);
                var hashpassword = Helper.EncodePassword(resetParam.Password, keyNew);

                object[] objArrayUser = new object[] {
                     "@P_ACTIONCODE", 'R'
                    ,"@EmailID", resetParam.EmailId
                    ,"@Password", hashpassword
                    ,"@VCode", keyNew
                };
                DynamicParameters param = objArrayUser.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UserRegistrations_ACTION", param, commandType: CommandType.StoredProcedure);
                string retMsg = param.Get<string>("PVCH_MSGOUT");
                strRetMsg = retMsg;
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                strRetMsg = "404";
                return null;
                // log.Error(ex);
            }
            return strRetMsg;
        }
    }
}
