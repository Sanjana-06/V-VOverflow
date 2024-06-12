using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace Utils
{
    using Models;
    using MySqlX.XDevAPI;
    using Newtonsoft.Json;
    using System.Configuration;
    using System.Globalization;
    using System.IO;
    using System.Runtime.Remoting.Channels;
    using System.Web;

    public static class BasicAction
    {
        public static readonly Random rand = new Random();
        public static readonly CultureInfo ci;
        public static readonly int max_allowed_answers = 10;
        static BasicAction()
        {
            BasicAction.ci = (CultureInfo)CultureInfo.CurrentCulture.Clone();
            ci.NumberFormat = new NumberFormatInfo();
            ci.NumberFormat.NumberDecimalSeparator = ".";

            String max_answersSTR = ConfigurationManager.AppSettings["max_allowed_answers"];
            if (max_answersSTR != null)
            {
                if (!int.TryParse(max_answersSTR, out BasicAction.max_allowed_answers)) BasicAction.max_allowed_answers = 10;
            }
        }        
    }
    public static class SessionValues
    {
        public static String UserName
        {
            get { return HttpContext.Current.Session["UserName"] as String; }
            set { HttpContext.Current.Session["UserName"] = value; }
        }
        public static String UserEmail
        {
            get { return HttpContext.Current.Session["UserEmail"] as String; }
            set { HttpContext.Current.Session["UserEmail"] = value; }
        }
    }
}
