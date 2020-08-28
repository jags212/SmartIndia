﻿using Dapper;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace SmartIndia.Data.Services.Host
{
    public class HostCourseServices : RepositoryBase
    {
        string retMsg = string.Empty;
        public HostCourseServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        public string HostCourseAction(HostCourses hostCourses)
        {

            object[] objArray = new object[] {
                     "@P_ACTIONCODE", hostCourses.ACTIONCODE
                    ,"@CourseID",hostCourses.CourseId
                    ,"@UserId",1
                    ,"@CourseName", hostCourses.CourseName
                    ,"@CourseDesc", hostCourses.CourseDesc
                    ,"@Topics", hostCourses.Topics
                    ,"@Duration", hostCourses.Duration
                    ,"@ClassFrequency", hostCourses.ClassFrequency
                    ,"@NoOfClass", hostCourses.NoOfClass
                    ,"@Cost",hostCourses.Cost
                    ,"@UpdatedById", 1
                    ,"@CurrencyId",1
        };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@StartDate", hostCourses.StartDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                param.Add("@EndDate", hostCourses.EndDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Execute("USP_HostCourses_ACTION", param, commandType: CommandType.StoredProcedure);
                retMsg = param.Get<string>("PVCH_MSGOUT");

            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = "";
                // log.Error(ex);
            }
            return retMsg;
        }

        [Obsolete]
        public List<HostCourses> GetHostCourse(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<HostCourses>("USP_GetHostCourses_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<HostCourses> HostCourses = new List<HostCourses>();
                foreach (var item in result)
                {
                    var modal = new HostCourses()
                    {
                        CourseId = item.CourseId,
                        UserId = item.UserId,
                        CourseName=item.CourseName,
                        CourseDesc=item.CourseDesc,
                        Topics=item.Topics,
                        StartDate = TimeZone.CurrentTimeZone.ToLocalTime(item.StartDate),
                        EndDate = TimeZone.CurrentTimeZone.ToLocalTime(item.EndDate),
                        Duration = item.Duration,
                        ClassFrequency = item.ClassFrequency,
                        NoOfClass = item.NoOfClass
                    };
                    HostCourses.Add(modal);
                }
                return HostCourses;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
