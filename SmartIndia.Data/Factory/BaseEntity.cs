// ***********************************************************************
// Assembly         : SmartIndia.Data
// Author           : Surya Sagar Swain
// Created          : 17-July-2020
//
// Last Modified By : 
// Last Modified On : 
// ***********************************************************************
// <copyright file="BaseEntity.cs" company="Eastern Bay">
//     Copyright ©  2020
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace SmartIndia.Data.Factory
{
    /// <summary>
    /// Interface IEntity
    /// </summary>
    public interface IEntity
    {
    }
    /// <summary>
    /// Class BaseEntity.
    /// </summary> 
    public abstract class BaseEntity : IEntity
    {
    }
    /// <summary>
    /// Class BaseEntity.
    /// </summary>
    /// <typeparam name="T"></typeparam> 
    public abstract class BaseEntity<T> : BaseEntity, IEntity
    {
        /// <summary>
        /// Gets or sets the key.
        /// </summary>
        /// <value>The key.</value>
        public abstract T Key { get; set; }
    }

}
