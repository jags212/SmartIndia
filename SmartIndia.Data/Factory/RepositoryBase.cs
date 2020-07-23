﻿// ***********************************************************************
// Assembly         : SmartIndia.Data
// Author           : Surya Sagar Swain
// Created          : 17-July-2020
//
// Last Modified By : 
// Last Modified On : 
// ***********************************************************************
// <copyright file="RepositoryBase.cs" company="Eastern Bay">
//     Copyright ©  2020
// </copyright>
// <summary></summary>
// ***********************************************************************

using Dapper;
using System;
using System.Collections.Generic;
using System.Data;

namespace SmartIndia.Data.Factory
{
    /// <summary>
    /// Class RepositoryBase.
    /// </summary>     
    public abstract class RepositoryBase : IRepository
    {
        /// <summary>
        /// Gets the connection.
        /// </summary>
        /// <value>The connection.</value>
        protected IDbConnection DBConnection;

        /// <summary>
        /// The disposed
        /// </summary>
        private bool _disposed;

        /// <summary>
        /// Initializes a new instance of the <see cref="RepositoryBase{TEntity}"/> class.
        /// </summary>
        /// <param name="connectionFactory">The connection factory.</param>
        protected RepositoryBase(IConnectionFactory connectionFactory)
        {
            DBConnection = connectionFactory.GetConnection;
        }        

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        private void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    DBConnection?.Dispose();
                }
                _disposed = true;
            }
        }

        /// <summary>
        /// Finalizes an instance of the <see cref="RepositoryBase{TEntity}"/> class.
        /// </summary>
        ~RepositoryBase()
        {
            Dispose(false);
        }
    }

    
}
