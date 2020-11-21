using Dapper;
using RestSharp;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Enums;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Helpers;
using SmartIndia.Data.Models;
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
        ReturnParamMsg retParamMsg = new ReturnParamMsg();
        ReturnBoolParam retBoolParamMsg = new ReturnBoolParam();
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
                    ,"@DeviceResources", registration.DeviceResources
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
                            SendEmail(registration.EmailId, registration.ServiceURL, ACode.ToString(), registration.DeviceResources);
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
        public ForgotParam CheckValidEmail(string email, string AppURL)
        {
            ForgotParam forgotParam = new ForgotParam();
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
                    forgotParam.retOut = "User Not Found";
                    forgotParam.status = "201";
                    forgotParam.userRegistration = null;
                }
                else
                {
                    if (getUser.SignUpBy == (int)SignUpBy.EmailID)
                    {
                        SendEmailForResetPassword(email, AppURL, getUser.UID.ToString());
                    }
                    forgotParam.status = "200";
                    forgotParam.retOut = "User Found";
                    forgotParam.userRegistration = getUser;
                }
                
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                forgotParam.retOut = ex.Message;
                forgotParam.status = "400";
                forgotParam.userRegistration = null;
                // log.Error(ex);
            }
            return forgotParam;
        }
        public ReturnParamMsg UpdareResetPassword(ResetParam resetParam)
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
                retParamMsg = new ReturnParamMsg
                {
                    retOut = strRetMsg,
                    status = "200"
                };
            }
            catch (Exception ex)
            {

                // throw new Exception(ex.Message);
                retParamMsg = new ReturnParamMsg
                {
                    retOut = "",
                    status = "404"
                };
            }
            return retParamMsg;
        }
        public string SendEmail(string emailID, string serviceUrl, string ActivationCode,int DeviceResources)
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
                                    "\"name\": \"OCR\",\r\n    " +
                                    "\"email\": \"napoleon.mohanta@gmail.com\"\r\n" +
                                "},\r\n" +
                        "\"to\": " +
                                "[\r\n    " +
                                    "{\r\n" +
                                        "\"email\": \"" + emailID + "\",\r\n" +
                                        "\"name\": \"" + emailID + "\"\r\n    " +
                                    "}\r\n" +
                                "],\r\n" +
                        "\"subject\": \"OCR Email Confirmation\",\r\n" +
                        "\"htmlContent\": \"<html><head></head><body><p>Dear User,</p>" +
                        "<p>Thanks for signing up to OCR!</p>" +
                        "<p>To get started, click the link below to confirm your account.</p>" +
                        "<p><a href='" + serviceUrl + "/ManageUsers/Users/UserVerification?Id=" + ActivationCode + "&Resources="+ DeviceResources + "'>Confirm your account</a></p>" +
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
                                    "\"name\": \"OCR\",\r\n    " +
                                    "\"email\": \"napoleon.mohanta@gmail.com\"\r\n" +
                                "},\r\n" +
                        "\"to\": " +
                                "[\r\n    " +
                                    "{\r\n" +
                                        "\"email\": \"" + emailID + "\",\r\n" +
                                        "\"name\": \"" + emailID + "\"\r\n    " +
                                    "}\r\n" +
                                "],\r\n" +
                        "\"subject\": \"OCR Reset Your Password\",\r\n" +
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
        public bool IsEmailConfirm(string acode)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@P_ACTIONCODE", "EC"
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
        public UserRegistrationInterestDetails GetUserDetails(Int64 userid)
        {
            try
            {
                object[] objArrayUser = new object[] {
                     "@UserId", userid
                };
                DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
                var result = DBConnection.QueryMultiple("USP_GetUserDetailsByUserID", paramUser, commandType: CommandType.StoredProcedure);

                var userDetails = result.Read<UserRegistrationInterestDetails>().Single();
                var userInterests = result.Read<ConficCourseInterest>().ToList();
                userDetails.Interests = userInterests;

                return userDetails;
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return null;
                // log.Error(ex);
            }
        }
        [Obsolete]
        public List<UserRegistrationInterestDetails> GetProfileImage(Getprofileimage getprofileimage)
        {
            object[] objArray = new object[] {
                     "@UserId",getprofileimage.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<UserRegistrationInterestDetails>("USP_GetUserProfileImgByUserID", param, commandType: CommandType.StoredProcedure).ToList();
                List<UserRegistrationInterestDetails> getimage = new List<UserRegistrationInterestDetails>();
                foreach (var item in result)
                {
                    var modal = new UserRegistrationInterestDetails()
                    {

                        ImageName = item.ImageName,
                        ImageExt = item.ImageExt,
                        ImageUrl = item.ImageUrl
                    };
                    getimage.Add(modal);
                }
                return getimage;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public ReturnParamMsg UpdateUserData(UserRegistrationDetails registration)
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
                    ,"@OtherCourseCategoryName", registration.OtherCourseCategoryName
                    ,"@ImageExt", registration.ImageExt
                };
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@DOB", registration.DOB, DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Execute("USP_UserProfile_ACTION", param, commandType: CommandType.StoredProcedure);
                string retSP = param.Get<string>("PVCH_MSGOUT");
                strRetMsg = retSP;
                foreach (var item in registration.Interests)
                {
                    object[] objArrayInstr = new object[] {
                     "@P_ACTIONCODE", "A"
                    ,"@UserId", registration.UserId
                    ,"@CourseCategoryId", item.InterestId
                };
                    DynamicParameters paramInt = objArrayInstr.ToDynamicParameters();
                    var resultInt = DBConnection.Execute("USP_UserCourseInterests", paramInt, commandType: CommandType.StoredProcedure);

                }
                retParamMsg = new ReturnParamMsg
                {
                    retOut = strRetMsg,
                    status = "200"
                };


            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retParamMsg = new ReturnParamMsg
                {
                    retOut = "",
                    status = "404"
                };
                // log.Error(ex);
            }
            return retParamMsg;
        }
        public ReturnBoolParam CheckUserPass(Guid uid, string oldPass)
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
                    retBoolParamMsg = new ReturnBoolParam
                    {
                        retOut = true,
                        status = "200"
                    };
                }
                else
                {
                    retBoolParamMsg = new ReturnBoolParam
                    {
                        retOut = false,
                        status = "200"
                    };
                }
            }
            catch (Exception ex)
            {
                retBoolParamMsg = new ReturnBoolParam
                {
                    retOut = false,
                    status = "500"
                };
            }
            return retBoolParamMsg;
        }
        public ReturnBoolParam CkeckEmailId(Guid uid, string currentemail)
        {
            try
            {
                object[] objArray = new object[] {
                "@ActionCode", "E",
                     "@UID",uid
                };
                DynamicParameters paramUser = objArray.ToDynamicParameters();
                var result = DBConnection.Query("USP_GetUserDetails", paramUser, commandType: CommandType.StoredProcedure).Single();

                if (currentemail == result.Emailid)
                {
                    retBoolParamMsg = new ReturnBoolParam
                    {
                        retOut = true,
                        status = "200",
                        retMsg="Email Verified"
                    };
                }
                else
                {
                    retBoolParamMsg = new ReturnBoolParam
                    {
                        retOut = false,
                        status = "200",
                        retMsg = "Current email is not correct..."
                    };
                }

            }
            catch (Exception ex)
            {
                retBoolParamMsg = new ReturnBoolParam
                {
                    retOut = false,
                    status = "500"
                };
            }
            return retBoolParamMsg;
        }
        public ReturnParamMsg UpdatEmailid(UpdateEmail updateEmail)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", "A"
                        ,"@Emailid",updateEmail.Emailid
                        ,"@UID",updateEmail.UID
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UpdateUserEmailid", param, commandType: CommandType.StoredProcedure);
                strRetMsg = param.Get<string>("PVCH_MSGOUT");

                if (strRetMsg == "1")
                {
                    SendEmailforMailidChange(updateEmail.Emailid, updateEmail.ServiceURL, updateEmail.UID);
                }
                else
                {
                    //Send Mobile SMS OTP
                }
                retParamMsg = new ReturnParamMsg
                {
                    retOut = strRetMsg,
                    status = "200"
                };
            }
            catch (Exception ex)
            {
                retParamMsg = new ReturnParamMsg
                {
                    retOut = ex.Message,
                    status = "500"
                };
            }
            return retParamMsg;
        }
        public string SendEmailforMailidChange(string emailID, string serviceUrl, string ActivationCode)
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
                                    "\"name\": \"OCR\",\r\n    " +
                                    "\"email\": \"napoleon.mohanta@gmail.com\"\r\n" +
                                "},\r\n" +
                        "\"to\": " +
                                "[\r\n    " +
                                    "{\r\n" +
                                        "\"email\": \"" + emailID + "\",\r\n" +
                                        "\"name\": \"" + emailID + "\"\r\n    " +
                                    "}\r\n" +
                                "],\r\n" +
                        "\"subject\": \"OCR Email Confirmation\",\r\n" +
                        "\"htmlContent\": \"<html><head></head><body><p>Dear User,</p>" +
                        //"<p>Thanks for signing up to Smart India!</p>" +
                        "<p>Click the link below to verify your email id.</p>" +
                        "<p><a href='" + serviceUrl + "/ManageUsers/Users/ChangeEmailVerification?Id=" + ActivationCode + "'>Confirm your Email</a></p>" +
                        "</body></html>\"\r\n" +
                    "}"
                , ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            return "";
        }
        public ReturnBoolParam CkeckCurrentmobno(Guid uid, string MobNo)
        {
            try
            {
                object[] objArray = new object[] {
                "@ActionCode", "M",
                     "@UID",uid
                };
                DynamicParameters paramUser = objArray.ToDynamicParameters();
                var result = DBConnection.Query("USP_GetUserDetails", paramUser, commandType: CommandType.StoredProcedure).Single();
                if (MobNo == result.MobileNo)
                {
                    retBoolParamMsg = new ReturnBoolParam
                    {
                        retOut = true,
                        status = "200",
                        retMsg="Mobile Number Verified"

                    };
                }
                else
                {
                    retBoolParamMsg = new ReturnBoolParam
                    {
                        retOut = false,
                        status = "200",
                        retMsg= "Current mobile no is not correct..."
                    };
                }

            }
            catch (Exception ex)
            {
                retBoolParamMsg = new ReturnBoolParam
                {
                    retOut = false,
                    status = "500"
                };
            }
            return retBoolParamMsg;
        }
        public ReturnParamMsg UpdateMobileNo(UpdateMob updateMob)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", "A"
                        ,"@MobileNo",updateMob.MobileNo
                        ,"@UID",updateMob.UID
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UpdateUserMobileNo", param, commandType: CommandType.StoredProcedure);
                strRetMsg = param.Get<string>("PVCH_MSGOUT");

                if (strRetMsg == "1")
                {
                    SendSMS(updateMob.OTP, updateMob.MobileNo);
                }
                else
                {
                    //Send Mobile SMS OTP
                }
                retParamMsg = new ReturnParamMsg
                {
                    retOut = strRetMsg,
                    status = "200"
                };
            }
            catch (Exception ex)
            {
                retParamMsg = new ReturnParamMsg
                {
                    retOut = ex.Message,
                    status = "500"
                };
            }
            return retParamMsg;
        }
        public string SendSMS(string OTP, string MobileNo)
        {
            var client = new RestClient("http://59.162.167.52/api/MessageCompose?admin=napoleon.mohanta@gmail.com&user=karanjiacollege@gmail.com:G3L2P4V727&senderID=KJACLG&receipientno=" + MobileNo + "&msgtxt=Greetings from SmartIndia . Your OTP code is: " + OTP + " . Code valid for 5 minutes only.&state=4");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            IRestResponse response = client.Execute(request);
            return response.Content;

        }
        public string MobileConfirmed(UpdateMobileConfirmed updateMobileConfirmed)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", "AC"
                        ,"@UID",updateMobileConfirmed.UID
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_UpdateUserMobileNo", param, commandType: CommandType.StoredProcedure);
                strRetMsg = param.Get<string>("PVCH_MSGOUT");
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                strRetMsg = "";
                // log.Error(ex);
            }
            return strRetMsg;
        }
    }
}
