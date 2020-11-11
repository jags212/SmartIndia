using Dapper;
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
    public class HostClassWallServices : RepositoryBase
    {
        public HostClassWallServices(IConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }
        [Obsolete]
        public List<ClassWallCalender> BindClassWallCallendar(HostParameter hostParameter)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE",hostParameter.ACTIONCODE,
                     "@UserId",hostParameter.UserId
            };
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<ClassWallsCalender>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                List<ClassWallCalender> classwallCalender = new List<ClassWallCalender>();
                foreach (var item in result)
                {
                    string color = "";
                    if (item.Status)
                    {
                        if (item.ClassType == "Accomplished")
                        {
                            color = "#4CAF50"; 
                        }
                        else
                        {
                            if (item.IsPublished == 2)
                            {
                                color = "#17a2b8";
                            }
                            else
                            {
                                color = "#ffc107";
                            }
                        }
                    }
                    else
                    {
                        color = "#6c757d";
                    }
                    var modal = new ClassWallCalender()
                    {
                        title = item.CourseName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd"),
                        start = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd") + "T" + item.StartTime + ":00",
                        end = "",
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        Uname = item.Uname,
                        BatchName = item.BatchName,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId = item.CourseId,
                        SchedularId = item.SchedularId,
                        color = color,
                        url= hostParameter.Curl + "/Hosts/ClassWall/ClassWallDetail?SID="+ item.SchedularId + ""


                    };
                    classwallCalender.Add(modal);
                }
                return classwallCalender;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Obsolete]
        public List<ClassWallClassDetails> BindClassWallDetail(HostParameterCourseDetail hostParameterCourseDetail)
        {
            object[] objArray = new object[] {
                     "@P_ACTIONCODE","C",
                     "@UserId",hostParameterCourseDetail.UserId,
                     "@SchedularId",hostParameterCourseDetail.SchedularId
            }; 
            try
            {
                DynamicParameters param = objArray.ToDynamicParameters();
                var result = DBConnection.Query<ClassWallsClassDetails>("USP_GetHostSchedular_ACTION", param, commandType: CommandType.StoredProcedure).ToList();
                string noofdada = result.Count.ToString();
                List<ClassWallClassDetails> classWallDetails = new List<ClassWallClassDetails>();
                foreach (var item in result)
                {
                    var modal = new ClassWallClassDetails()
                    {
                        title = item.CourseName,
                        CourseName = item.CourseName,
                        ScheduleDate = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd"),
                        start = TimeZone.CurrentTimeZone.ToLocalTime(item.ScheduleDate).ToString("yyyy-MM-dd") + "T" + item.StartTime + ":00",
                        end = "",
                        StartTime = item.StartTime,
                        EndTime = item.EndTime,
                        Uname = item.Uname,
                        BatchName = item.BatchName,
                        CourseDesc = item.CourseDesc,
                        Topics = item.Topics,
                        CourseId = item.CourseId,
                        SchedularId = item.SchedularId,
                        ClassType = item.ClassType,
                        Status = item.Status,
                        IsPublished = item.IsPublished,
                        NoOfData = noofdada

                    };
                    classWallDetails.Add(modal);
                }
                return classWallDetails;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}

