using System;

namespace SmartIndia.RestAPI
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
    public class MobWebViewURL
    {
        public int SlNo { get; set; }
       

        public string LinkName { get; set; }

        public string URLName { get; set; }
    }
}
