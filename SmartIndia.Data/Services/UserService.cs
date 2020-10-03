using Dapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Helpers;
using SmartIndia.Data.Models;
using SmartIndia.RestAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SmartIndia.Data.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress);
        AuthenticateResponse AuthenticateByEmail(AuthenticateRequestByEmail model, string ipAddress);
        AuthenticateResponse RefreshToken(string token, string ipAddress);
        bool RevokeToken(string token, string ipAddress);
        IEnumerable<UserRegistration> GetAll();
        UserRegistration GetById(Int64 id);
    }

    public class UserService : RepositoryBase, IUserService
    {
        private DataContext _context;
        private readonly AppSettings _appSettings;

        public UserService(DataContext context, IOptions<AppSettings> appSettings, IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress)
        {
            object[] objArrayUser = new object[] {
                     "@ACTIONCODE", 'A'
                    ,"@UserName", model.EmailID
            };
            DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
            var getUser = DBConnection.QueryFirstOrDefault("USP_LoginManagement_ACTION", paramUser, commandType: CommandType.StoredProcedure);
            if (getUser == null) return null;
            var hashCode = getUser.VCode;
            //Password Hasing Process Call Helper Class Method    
            var encodingPasswordString = Helper.EncodePassword(model.Password, hashCode);
            //Check Login Detail User Name Or Password    
            object[] objArrayUserD = new object[] {
                     "@ACTIONCODE", 'B'
                    ,"@UserName", model.EmailID
                    ,"@Password", encodingPasswordString
            };
            DynamicParameters paramUserD = objArrayUserD.ToDynamicParameters();
            var userRegistration = DBConnection.QueryFirstOrDefault<UserRegistration>("USP_LoginManagement_ACTION", paramUserD, commandType: CommandType.StoredProcedure);
            // return null if user not found
            if (userRegistration == null) return null;

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = generateJwtToken(userRegistration);
            var refreshToken = generateRefreshToken(ipAddress);

            // save refresh token
            object[] objArrayToken = new object[] {
                     "@ACTIONCODE", 'I'
                    ,"@Token", refreshToken.Token
                    ,"@CreatedByIp", refreshToken.CreatedByIp
                    ,"@UserRegistrationUserId", userRegistration.UserId
            };
            DynamicParameters paramToken = objArrayToken.ToDynamicParameters();
            paramToken.Add("@Expires", refreshToken.Expires, DbType.DateTime, ParameterDirection.Input);
            paramToken.Add("@Created", refreshToken.Created, DbType.DateTime, ParameterDirection.Input);
            DBConnection.Execute("USP_LoginManagement_ACTION", paramToken, commandType: CommandType.StoredProcedure);

            return new AuthenticateResponse(userRegistration, jwtToken, refreshToken.Token);
        }
        public AuthenticateResponse AuthenticateByEmail(AuthenticateRequestByEmail model, string ipAddress)
        {
            object[] objArrayUserD = new object[] {
                     "@ACTIONCODE", 'E'
                    ,"@UID", Guid.Parse(model.ACode)
            };
            DynamicParameters paramUserD = objArrayUserD.ToDynamicParameters();
            var userRegistration = DBConnection.QueryFirstOrDefault<UserRegistration>("USP_LoginManagement_ACTION", paramUserD, commandType: CommandType.StoredProcedure);
            // return null if user not found
            if (userRegistration == null) return null;

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = generateJwtToken(userRegistration);
            var refreshToken = generateRefreshToken(ipAddress);

            // save refresh token
            object[] objArrayToken = new object[] {
                     "@ACTIONCODE", 'I'
                    ,"@Token", refreshToken.Token
                    ,"@CreatedByIp", refreshToken.CreatedByIp
                    ,"@UserRegistrationUserId", userRegistration.UserId
            };
            DynamicParameters paramToken = objArrayToken.ToDynamicParameters();
            paramToken.Add("@Expires", refreshToken.Expires, DbType.DateTime, ParameterDirection.Input);
            paramToken.Add("@Created", refreshToken.Created, DbType.DateTime, ParameterDirection.Input);
            DBConnection.Execute("USP_LoginManagement_ACTION", paramToken, commandType: CommandType.StoredProcedure);

            return new AuthenticateResponse(userRegistration, jwtToken, refreshToken.Token);
        }

        public AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            object[] objArrayUser = new object[] {
                     "@ACTIONCODE", 'C'
                    ,"@Token", token
            };
            DynamicParameters paramUser = objArrayUser.ToDynamicParameters();
            var userRegistration = DBConnection.QueryFirstOrDefault<UserRegistration>("USP_LoginManagement_ACTION", paramUser, commandType: CommandType.StoredProcedure);

            // return null if no user found with token
            if (userRegistration == null) return null;

            //var refreshToken = userRegistration.RefreshTokens.Single(x => x.Token == token);
            object[] objArrayToken = new object[] {
                     "@ACTIONCODE", 'D'
                    ,"@Token", token
            };
            DynamicParameters paramToken = objArrayToken.ToDynamicParameters();
            var refreshToken = DBConnection.QueryFirstOrDefault<RefreshToken>("USP_LoginManagement_ACTION", paramToken, commandType: CommandType.StoredProcedure);

            // return null if token is no longer active
            if (!refreshToken.IsActive) return null;

            // replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);

            //update RefreshToken table 
            object[] objArrayTokenUpdate = new object[] {
                     "@ACTIONCODE", 'U'
                    ,"@RevokedByIp", ipAddress
                    ,"@ReplacedByToken", newRefreshToken.Token
                    ,"@RefreshTokenId", refreshToken.Id
            };
            DynamicParameters paramTokenUpdate = objArrayTokenUpdate.ToDynamicParameters();
            paramTokenUpdate.Add("@Revoked", DateTime.UtcNow, DbType.DateTime, ParameterDirection.Input);
            DBConnection.Execute("USP_LoginManagement_ACTION", paramTokenUpdate, commandType: CommandType.StoredProcedure);

            // save new refresh token
            object[] objArrayNewToken = new object[] {
                     "@ACTIONCODE", 'I'
                    ,"@Token", newRefreshToken.Token
                    ,"@CreatedByIp", newRefreshToken.CreatedByIp
                    ,"@UserRegistrationUserId", userRegistration.UserId
            };
            DynamicParameters paramNewToken = objArrayNewToken.ToDynamicParameters();
            paramNewToken.Add("@Expires", newRefreshToken.Expires, DbType.DateTime, ParameterDirection.Input);
            paramNewToken.Add("@Created", newRefreshToken.Created, DbType.DateTime, ParameterDirection.Input);
            DBConnection.Execute("USP_LoginManagement_ACTION", paramNewToken, commandType: CommandType.StoredProcedure);


            // generate new jwt
            var jwtToken = generateJwtToken(userRegistration);

            return new AuthenticateResponse(userRegistration, jwtToken, newRefreshToken.Token);
        }

        public bool RevokeToken(string token, string ipAddress)
        {
            var userRegistration = _context.UserRegistrations.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            // return false if no user found with token
            if (userRegistration == null) return false;

            var refreshToken = userRegistration.RefreshTokens.Single(x => x.Token == token);

            // return false if token is not active
            if (!refreshToken.IsActive) return false;

            // revoke token and save
            //refreshToken.Revoked = DateTime.UtcNow.ToString("yyyy-MM-dd'T'HH:mm:ss.fffK", CultureInfo.InvariantCulture);
            refreshToken.RevokedByIp = ipAddress;
            _context.Update(userRegistration);
            _context.SaveChanges();

            return true;
        }

        public IEnumerable<UserRegistration> GetAll()
        {
            var res = DBConnection.Query<UserRegistration>("select * from UserRegistrations").ToList();
            return res;
        }

        public UserRegistration GetById(Int64 id)
        {
            var res = DBConnection.Query<UserRegistration>("select * from UserRegistrations where UserId=" + id + "").FirstOrDefault();
            return res;
        }

        // helper methods

        private string generateJwtToken(UserRegistration userRegistration)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userRegistration.UserId.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, userRegistration.UID.ToString()),
                    new Claim(ClaimTypes.Role, userRegistration.RoleName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }
    }
}
