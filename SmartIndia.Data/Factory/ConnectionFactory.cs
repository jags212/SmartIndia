// ***********************************************************************
// Assembly         : SmartIndia.Data
// Author           : Surya Sagar Swain
// Created          : 17-July-2020
//
// Last Modified By : 
// Last Modified On : 
// ***********************************************************************
// <copyright file="ConnectionFactory.cs" company="Easter Bay">
//     Copyright ©  2020
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace SmartIndia.Data.Factory
{
    /// <summary>
    /// Class ConnectionFactory.
    /// </summary> 
    public class ConnectionFactory : IConnectionFactory
    {
        /// <summary>
        /// The connection string
        /// </summary>
        private readonly string _connectionString;

        /// <summary>
        /// Initializes a new instance of the <see cref="ConnectionFactory"/> class.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        public ConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }
        /// <summary>
        /// Overloaded constructor for .Net Core
        /// </summary>
        /// <param name="config">Configuration interface</param>
        /// <param name="connectionString">KEY name for holding the connection string</param>
        public ConnectionFactory(IConfiguration config, string connectionString)
        {
            _connectionString = config.GetConnectionString(connectionString);
        }

        /// <summary>
        /// Gets the get connection.
        /// </summary>
        /// <value>The get connection.</value>
        public IDbConnection GetConnection => new SqlConnection(_connectionString);
    }
}
