using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Mvc;
using BAL;
using Models;
using System.Data;
using Utils;

namespace VnVOverflow.Controllers
{
    public partial class HomeController : Controller
    {
        /// <summary>
        /// url : ~/Home/GetUserName
        /// </summary>
        /// <returns></returns>
        public String GetUserName() { return SessionValues.UserName; }

        [HttpPost]
        public String LogInUser()
        {
            String user_email = Request.Form["user_email"];
            String user_pwd = Request.Form["user_pwd"];
            if (String.IsNullOrEmpty(user_email) || String.IsNullOrEmpty(user_pwd)) return null;
            if (this.GetUserName() != null) return user_email;
            String name = BusinessLayer.VerifyUser(user_email, user_pwd);
            if (null != name)
            {
                SessionValues.UserName = name;
                SessionValues.UserEmail = user_email;
                return user_email;
            }
            return null;
        }
    }
}