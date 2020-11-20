using Dapper;
using SmartIndia.Data.Entities;
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
    public class HostReschedulingServices : RepositoryBase
    {
        string retMsg;
        ReturnParamMsg retParamMsg = new ReturnParamMsg();
         
        public HostReschedulingServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }

        [Obsolete]
        public List<GetReschedulingDetails> BindSchedular(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<GetReschedulingDetails>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<GetReschedulingDetails> GetReschedulingDetails = new List<GetReschedulingDetails>();
                foreach (var item in result)
                {
                    var modal = new GetReschedulingDetails()
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
                        IsPublished = item.IsPublished,
                        Status=item.Status

                    };
                    GetReschedulingDetails.Add(modal);
                }
                return GetReschedulingDetails;


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
                        SchedularId = item.SchedularId,
                        CourseName = item.CourseName,
                        BatchName = item.BatchName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate),
                        Duration = item.Duration,
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        IsPublished = item.IsPublished,
                        Status = item.Status
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
        public ReturnParamMsg UpdateHostSchedularActionOnce(HostSchedular hostSchedular)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", "H"
                        ,"@SchedularId",hostSchedular.SchedularId
                        ,"@CourseID",hostSchedular.CourseId
                        ,"@UserId",hostSchedular.UserId
                        ,"@ClassRoomPwd", "PWD"
                        ,"@UpdatedById", hostSchedular.UpdatedById
                        ,"@Duration",hostSchedular.Duration
                        ,"@BatchName",hostSchedular.BatchName
                        ,"@IsPublished",(int)RecordPublished.Publish
            };
            object[] objArrayRs = new object[] {
                         "@P_ACTIONCODE", hostSchedular.ACTIONCODE
                        ,"@SchedularId",hostSchedular.SchedularId
                        ,"@Remarks",hostSchedular.Remarks
                        ,"@RescheduleOrCancel",(int)RescheduleOrCancel.RePublished
            };
            object[] objArrayStatus = new object[] {
                         "@P_ACTIONCODE","R"
                        ,"@SchedularId",hostSchedular.SchedularId
                        ,"@UpdatedById", hostSchedular.UpdatedById
                        ,"@IsPublished",(int)RecordPublished.RePublished
            };

            try
            {
                DynamicParameters paramStatus = objArrayStatus.ToDynamicParameters("@PVCH_MSGOUT");
                var resultStatus = DBConnection.Execute("USP_HostSchedular_ACTION", paramStatus, commandType: CommandType.StoredProcedure);
                retMsg = paramStatus.Get<string>("PVCH_MSGOUT");

                DynamicParameters paramRs = objArrayRs.ToDynamicParameters("@PVCH_MSGOUT");
                var resultRs = DBConnection.Execute("USP_HostSchedularDetails_ACTION", paramRs, commandType: CommandType.StoredProcedure);
                retMsg = paramRs.Get<string>("PVCH_MSGOUT");


                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                param.Add("@ScheduleDate", hostSchedular.ScheduleDate.ToUniversalTime(), DbType.DateTime, ParameterDirection.Input);
                param.Add("@StartTime", hostSchedular.StartTime);
                param.Add("@EndTime", hostSchedular.EndTime);
                var result = DBConnection.Execute("USP_HostSchedular_ACTION", param, commandType: CommandType.StoredProcedure);
                retMsg = param.Get<string>("PVCH_MSGOUT");
                retParamMsg = new ReturnParamMsg
                {
                    retOut = retMsg,
                    status = "200"
                };
            }
            catch (Exception ex)
            {
                retParamMsg = new ReturnParamMsg
                {
                    retOut = "",
                    status = "500"
                };
            }
            return retParamMsg;
        }

        public ReturnParamMsg CancelHostSchedular(HostSchedularCancel hostSchedularCancel)
        {
            object[] objArray = new object[] {
                         "@P_ACTIONCODE", hostSchedularCancel.ACTIONCODE
                        ,"@SchedularId",hostSchedularCancel.SchedularId
                        ,"@Remarks",hostSchedularCancel.Remarks
                        ,"@RescheduleOrCancel",(int)RescheduleOrCancel.Canceled
                        ,"@UpdatedById",hostSchedularCancel.UpdatedById
            };
            object[] objArrayStatus = new object[] {
                         "@P_ACTIONCODE","D"
                        ,"@SchedularId",hostSchedularCancel.SchedularId
                        ,"@UpdatedById",hostSchedularCancel.UpdatedById
            };
            try
            {
                DynamicParameters paramStatus = objArrayStatus.ToDynamicParameters("@PVCH_MSGOUT");
                var resultStatus = DBConnection.Execute("USP_HostSchedular_ACTION", paramStatus, commandType: CommandType.StoredProcedure);
                retMsg = paramStatus.Get<string>("PVCH_MSGOUT");


                DynamicParameters param = objArray.ToDynamicParameters("@PVCH_MSGOUT");
                var result = DBConnection.Execute("USP_HostSchedularDetails_ACTION", param, commandType: CommandType.StoredProcedure);
                retMsg = param.Get<string>("PVCH_MSGOUT");
                retParamMsg = new ReturnParamMsg
                {
                    retOut = retMsg,
                    status = "200"
                };
            }
            catch (Exception ex)
            {
                retParamMsg = new ReturnParamMsg
                {
                    retOut = "",
                    status = "500"
                };
            }
            return retParamMsg;
        }
    }


}
