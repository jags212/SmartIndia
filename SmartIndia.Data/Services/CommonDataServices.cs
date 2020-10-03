using Dapper;
using RestSharp;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SmartIndia.Data.Services
{
    public class CommonDataServices : RepositoryBase
    {
        public CommonDataServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        } 
        public IList<ConfigCountrys> GetCountries()
        {
            List<ConfigCountrys> CountryList = new List<ConfigCountrys>();
            try
            {
                using (DBConnection)
                {
                    CountryList = DBConnection.Query<ConfigCountrys>("Select * from ConfigCountrys").ToList();
                }

            }
            catch (Exception ex)
            {
                CountryList = null; 
            }

            return CountryList;
        }
       
    }
}
