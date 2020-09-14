using Dapper;
using SmartIndia.Data.Entities.Host;
using SmartIndia.Data.Enums;
using SmartIndia.Data.Factory;
using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace SmartIndia.Data.Services.Host
{
    public class HostSchedularServices : RepositoryBase
    {
        string retMsg = string.Empty;
        public HostSchedularServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        public string HostSchedularAction(List<HostSchedular> hostSchedular)
        {


            try
            {
                foreach (var item in hostSchedular)
                {
                    object[] objArray = new object[] {
                     "@P_ACTIONCODE", item.ACTIONCODE
                    ,"@SchedularId",item.SchedularId
                    ,"@CourseID",item.CourseId
                    ,"@UserId",item.UserId
                    ,"@ClassRoomPwd", "PWD"
                    ,"@UpdatedById", item.UpdatedById
                    ,"@Duration",item.Duration
                    ,"@BatchName",item.BatchName.Replace(" ","")
                    ,"@IsPublished",(int)RecordPublished.UnPublished
                };
                    DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                    param.Add("@ScheduleDate", item.ScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                    param.Add("@StartTime", item.StartTime);
                    param.Add("@EndTime", item.EndTime);
                    var result = DBConnection.Execute("USP_HostSchedular_ACTION", param, commandType: CommandType.StoredProcedure);
                    retMsg = param.Get<string>("PVCH_MSGOUT");
                }
            }
            catch (Exception ex)
            {
                // throw new Exception(ex.Message);
                retMsg = "";
                // log.Error(ex);
            }
            return retMsg;
        }
        public string HostSchedularActionOnce(HostSchedular hostSchedular)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", hostSchedular.ACTIONCODE
                        ,"@SchedularId",hostSchedular.SchedularId
                        ,"@CourseID",hostSchedular.CourseId
                        ,"@UserId",hostSchedular.UserId
                        ,"@ClassRoomPwd", "PWD"
                        ,"@UpdatedById", hostSchedular.UpdatedById
                        ,"@Duration",hostSchedular.Duration
                        ,"@BatchName",hostSchedular.BatchName.Replace(" ","")
                        ,"@IsPublished",(int)RecordPublished.UnPublished
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@ScheduleDate", hostSchedular.ScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                param.Add("@StartTime", hostSchedular.StartTime);
                param.Add("@EndTime", hostSchedular.EndTime);
                var result = DBConnection.Execute("USP_HostSchedular_ACTION", param, commandType: CommandType.StoredProcedure);
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
        public List<GetSchedularDetails> GetHSchedular(getHostRecSchedularParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId,
                     "@CourseId",hostParameter.CourseId,
                     "@StartTime",hostParameter.StartTime,
                     "@EndTime",hostParameter.EndTime
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                param.Add("@StartScheduleDate", hostParameter.StartScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                param.Add("@EndScheduleDate", hostParameter.EndScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Query<GetSchedularDetails>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetSchedularDetails> GetSchedularDetails = new List<GetSchedularDetails>();
                foreach (var item in result)
                {
                    var modal = new GetSchedularDetails()
                    {
                        CourseId = item.CourseId,
                        UserId = item.UserId,
                        SchedularId = item.SchedularId,
                        CourseName = item.CourseName,
                        BatchName = item.BatchName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate),
                        Duration = item.Duration,
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        IsPublished=item.IsPublished
                    };
                    GetSchedularDetails.Add(modal);
                }
                return GetSchedularDetails;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Obsolete]
        public List<BindHostSchedular> BindSchedular(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<BindHostSchedular>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<BindHostSchedular> BindHostSchedular = new List<BindHostSchedular>();
                foreach (var item in result)
                {
                    var modal = new BindHostSchedular()
                    {
                        CourseId = item.CourseId,
                        UserId = item.UserId,
                        CourseName = item.CourseName,
                        BatchName = item.BatchName,
                        StartScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.StartScheduleDate),
                        EndScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.EndScheduleDate),
                        Duration = item.Duration,
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        IsPublished = item.IsPublished
                    };
                    BindHostSchedular.Add(modal);
                }
                return BindHostSchedular;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Obsolete]
        public List<UpdateHostSchedular> UpdateHSchedular(UpdateHostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@SchedularId",hostParameter.SchedularId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<UpdateHostSchedular>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();

                List<UpdateHostSchedular> UpdateHostSchedular = new List<UpdateHostSchedular>();
                foreach (var item in result)
                {
                    var modal = new UpdateHostSchedular()
                    {
                        CourseId = item.CourseId,
                        UserId = item.UserId,
                        CourseName = item.CourseName,
                        BatchName = item.BatchName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate),
                        Duration = item.Duration,
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        IsPublished = item.IsPublished
                    };
                    UpdateHostSchedular.Add(modal);
                }

                return UpdateHostSchedular;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string PublishSchedular(getHostRecSchedularParameter getHostRecSchedularParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",getHostRecSchedularParameter.ACTIONCODE,
                     "@CourseId",getHostRecSchedularParameter.CourseId,
                     "@StartTime",getHostRecSchedularParameter.StartTime,
                     "@EndTime",getHostRecSchedularParameter.EndTime,
                     "@IsPublished",(int)RecordPublished.Publish

            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@StartScheduleDate", getHostRecSchedularParameter.StartScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                param.Add("@EndScheduleDate", getHostRecSchedularParameter.EndScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                var result = DBConnection.Execute("USP_HostSchedularPublish_ACTION", param, commandType: CommandType.StoredProcedure);
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
        public string UpdateHostSchedularActionOnce(HostSchedular hostSchedular)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", hostSchedular.ACTIONCODE
                        ,"@SchedularId",hostSchedular.SchedularId
                        ,"@CourseID",hostSchedular.CourseId
                        ,"@UserId",hostSchedular.UserId
                        ,"@StartTime",hostSchedular.StartTime
                        ,"@EndTime",hostSchedular.EndTime
                        ,"@BatchName",hostSchedular.BatchName
                        ,"@ClassRoomPwd", "PWD"
                        ,"@UpdatedById", hostSchedular.UpdatedById
                        ,"@Duration",hostSchedular.Duration
                        ,"@BatchName",hostSchedular.BatchName
                        ,"@ScheduleDate",hostSchedular.ScheduleDate
            };
           
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@ScheduleDate", hostSchedular.ScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                param.Add("@StartTime", hostSchedular.StartTime);
                param.Add("@EndTime", hostSchedular.EndTime);
                var result = DBConnection.Execute("USP_HostSchedular_ACTION", param, commandType: CommandType.StoredProcedure);
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

    }
}
