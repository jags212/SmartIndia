using SmartIndia.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Services.MasterData
{
    public interface IMasterDataService
    {
        IEnumerable<ConfigCountrys> GetCountries();
        IEnumerable<ConficCourseInterest> GetCourseInterest();
    }
}
