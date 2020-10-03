using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Models
{
    public class ConfigCountrys
    {
        public int Id { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public int ConfigCurrencyId { get; set; }
    }

    public class ConficCourseInterest
    {
        public int Id { get; set; }
        public string CourseCategoryName { get; set; }
        public string IsChecked { get; set; }

    }
}
