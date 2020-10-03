using Dapper;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartIndia.Data.Services.MasterData
{
    public class MasterDataService : RepositoryBase, IMasterDataService
    {
        private readonly IConnectionFactory _connectionFactory;
        public MasterDataService(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }
        public IEnumerable<ConfigCountrys> GetCountries()
        {
            try
            {
                object[] objArray = new object[] {
                     "@ActionCode", "COUNTRY"
                };
                DynamicParameters paramUser = objArray.ToDynamicParameters();
                var result = DBConnection.Query<ConfigCountrys>("USP_GetCommonData", paramUser, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return null;
                // log.Error(ex);
            }
        }
        public IEnumerable<ConficCourseInterest> GetCourseInterest()
        {
            try
            {
                object[] objArray = new object[] {
                     "@ActionCode", "CourseInterest"
                };
                DynamicParameters paramUser = objArray.ToDynamicParameters();
                var result = DBConnection.Query<ConficCourseInterest>("USP_GetCommonData", paramUser, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                return null;
                // log.Error(ex);
            }
        }
    }
}
