// ***********************************************************************
// Assembly         : SmartIndia.Data
// Author           : Surya Sagar Swain
// Created          : 17-July-2020
//
// Last Modified By : 
// Last Modified On : 
// ***********************************************************************
// <copyright file="IConnectionFactory.cs" company="Eastern Bay">
//     Copyright ©  2020
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Data;

namespace SmartIndia.Data.Factory
{
    /// <summary>
    /// Interface IConnectionFactory
    /// </summary>
    public interface IConnectionFactory
    {
        /// <summary>
        /// Gets the get connection.
        /// </summary>
        /// <value>The get connection.</value>
        IDbConnection GetConnection { get; }
    }
}
