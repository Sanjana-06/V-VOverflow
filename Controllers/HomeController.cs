using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Mvc;
using BAL;
using Models;
using System.Data;

namespace VnVOverflow.Controllers
{
    public partial class HomeController : Controller
    {
        public HomeController() { }
        /// <summary>
        /// url :~/Home/Index
        /// url :~
        /// </summary>
        /// <returns></returns>
        public ActionResult Index() { return View(); }

        public ActionResult Raise() { return View(); }

        /// <summary>
        /// url : ~/Home/About
        /// </summary>
        /// <returns></returns>
        public ActionResult About() { return View(); }

        /// <summary>
        /// url :~/Home/Search
        /// </summary>
        /// <returns></returns>
        public ActionResult Search() { return View(); }


        /// <summary>
        /// url : ~/Home/allQueries
        /// </summary>
        /// <returns></returns>
        public ActionResult allQueries() { return View(); }
        /// <summary>
        /// url :~/Home/AnswerToAQuestion
        /// </summary>
        /// <returns></returns>
        public ActionResult AnswerToAQuestion() { return View(); }
    }
}