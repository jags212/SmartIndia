using Dapper;
using RestSharp;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Enums;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
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
                var ACode = Guid.NewGuid();
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
                    ,"@UID", ACode
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
                    if (arr[0] == "1")
                    {
                        if (registration.SignUpBy == 1)
                        {
                            SendEmail(registration.EmailId, registration.ServiceURL, ACode.ToString());
                        }
                        else
                        {
                            //Send Mobile SMS OTP
                        }
                    }
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
        public UserRegistration CheckValidEmail(string email, string AppURL)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@ACTIONCODE", 'A'
                    ,"@UserName", email
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
                var getUser = DBConnection.QueryFirstOrDefault<UserRegistration>("USP_LoginManagement_ACTION", paramUser, commandType: CommandType.StoredProcedure);

                if (getUser == null)
                {
                    return null;
                }
                else
                {
                    if (getUser.SignUpBy == (int)SignUpBy.EmailID)
                    {
                        SendEmailForResetPassword(email, AppURL, getUser.UID.ToString());
                    }
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
                    ,"@UID", resetParam.EmailId
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

        public string SendEmail(string emailID, string serviceUrl, string ActivationCode)
        {
            var client = new RestClient("https://api.sendinblue.com/v3/smtp/email");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("api-key", "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");
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json"
                , "{" +
                        "\r\n" +
                        "\"sender\": " +
                                "{\r\n" +
                                    "\"name\": \"Smart India\",\r\n    " +
                                    "\"email\": \"napoleon.mohanta@gmail.com\"\r\n" +
                                "},\r\n" +
                        "\"to\": " +
                                "[\r\n    " +
                                    "{\r\n" +
                                        "\"email\": \"" + emailID + "\",\r\n" +
                                        "\"name\": \"" + emailID + "\"\r\n    " +
                                    "}\r\n" +
                                "],\r\n" +
                        "\"subject\": \"Smart India Email Confirmation\",\r\n" +
                        "\"htmlContent\": \"<html><head></head><body><p>Dear User,</p>" +
                        "<p>Thanks for signing up to Smart India!</p>" +
                        "<p>To get started, click the link below to confirm your account.</p>" +
                        "<p><a href='" + serviceUrl + "/ManageUsers/Users/UserVerification?Id=" + ActivationCode + "'>Confirm your account</a></p>" +
                        "</body></html>\"\r\n" +
                    "}"
                , ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            return "";
        }
        public string SendEmailForResetPassword(string emailID, string serviceUrl, string ActivationCode)
        {
            var client = new RestClient("https://api.sendinblue.com/v3/smtp/email");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("api-key", "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");
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json"
                , "{" +
                        "\r\n" +
                        "\"sender\": " +
                                "{\r\n" +
                                    "\"name\": \"Smart India\",\r\n    " +
                                    "\"email\": \"napoleon.mohanta@gmail.com\"\r\n" +
                                "},\r\n" +
                        "\"to\": " +
                                "[\r\n    " +
                                    "{\r\n" +
                                        "\"email\": \"" + emailID + "\",\r\n" +
                                        "\"name\": \"" + emailID + "\"\r\n    " +
                                    "}\r\n" +
                                "],\r\n" +
                        "\"subject\": \"Smart India Reset Your Password\",\r\n" +
                        "\"htmlContent\": \"<html><head></head><body><p>Dear User,</p>" +
                        "<p>You recently asked to reset your OCR account password.</p>" +
                        "<p>Click the link below to reset your password.</p>" +
                        "<p><a href='" + serviceUrl + "/ManageUsers/Users/ResetPassword?Id=" + ActivationCode + "'>Reset Your Password</a></p>" +
                        "</body></html>\"\r\n" +
                    "}"
                , ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            return "";
        }

        public bool VerifyUser(string acode)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@P_ACTIONCODE", "EV"
                    ,"@UID", acode
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UserRegistrations_ACTION", paramUser, commandType: CommandType.StoredProcedure);
                string retMsg = paramUser.Get<string>("PVCH_MSGOUT");
                if (retMsg == "2")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return false;
                // log.Error(ex);
            }
        }
        public bool UserActive(string acode)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@P_ACTIONCODE", "AC"
                    ,"@UID", acode
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UserRegistrations_ACTION", paramUser, commandType: CommandType.StoredProcedure);
                string retMsg = paramUser.Get<string>("PVCH_MSGOUT");
                if (retMsg == "200")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return false;
                // log.Error(ex);
            }
        }
        public UserRegistrationDetails GetUserDetails(Int64 userid)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@UserId", userid
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
                var result = DBConnection.QuerySingle<UserRegistrationDetails>("USP_GetUserDetailsByUserID", paramUser, commandType: CommandType.StoredProcedure);
                return result;
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return null;
                // log.Error(ex);
            }
        }
        public string UpdateUserData(UserRegistrationDetails registration)
        {
            try
            {
                object[] objArray = new object[] {
                     "@P_ACTIONCODE", registration.ACTIONCODE
                    ,"@UserId", registration.UserId
                    ,"@FirstName", registration.FirstName
                    ,"@LastName", registration.LastName
                    ,"@ProfileName", registration.ProfileName
                    ,"@CountryId", registration.CountryId
                    ,"@PIN", registration.PIN
                    ,"@City", registration.City
                    ,"@Gender", registration.Gender
                    ,"@IsEmailPrivate", registration.IsEmailPrivate
                    ,"@IsMobilePrivate", registration.IsMobilePrivate
                    ,"@UpdatedById", registration.UserId
                };

                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@DOB", registration.DOB, DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Execute("USP_UserProfile_ACTION", param, commandType: CommandType.StoredProcedure);
                string retSP = param.Get<string>("PVCH_MSGOUT");
                strRetMsg = retSP;
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                strRetMsg = "404";
                // log.Error(ex);
            }
            return strRetMsg;
        }
        public bool CheckUserPass(Guid uid, string oldPass)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@ActionCode", "A"
                    ,"@UID", uid
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
                var result = DBConnection.Query("USP_GetUserDetails", paramUser, commandType: CommandType.StoredProcedure).Single();

                var oldhashpassword = Helper.EncodePassword(oldPass, result.VCode);

                if (oldhashpassword == result.Password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return false;
                // log.Error(ex);
            }
        }
    }
}
