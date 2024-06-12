using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Mvc;
using BAL;
using Models;
using System.Data;
using Utils;
using System.Linq;
using Microsoft.Ajax.Utilities;
using System.Web.Helpers;

namespace VnVOverflow.Controllers
{
    public partial class HomeController : Controller
    {
        /// <summary>
        /// url : ~/Home/GetAllQuestions
        /// </summary>
        /// <returns></returns>
        public String GetAllQuestions()
        {
            var dt = BusinessLayer.GetAllQuestions();
            //var dt = new DataTable("Labamba");
            //dt.Columns.Add("Id", typeof(int)); dt.Columns.Add("Name", typeof(String)); dt.Columns.Add("Address", typeof(String));
            //for (int i = 0; i < 10; ++i) dt.Rows.Add(new object[] { i, "Name_" + i, "Address_" + i });
            return JsonConvert.SerializeObject(dt);
        }
        /// <summary>
        /// url : ~/Home/SubmitQuestion
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public String SubmitQuestion()
        {
            string email = SessionValues.UserEmail;
            string question = Request.Form["question"];
            string category = Request.Form["category"];
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(question) || String.IsNullOrEmpty(category)) return "fail";

            var param = new
            {
                @name = email,
                @question = question,
                @category = category,
            };
            BusinessLayer.InsertQuestion(email, question, category);
            return "success";
        }
        [HttpPost]
        public String SubmitAnswer()
        {
            if (GetUserName() == null) return "false";

            string email = SessionValues.UserEmail;
            string user_name = SessionValues.UserName;
            string new_answer = Request.Form["new_answer"];
            string qidSTR = Request.Form["qid"];
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(new_answer) || String.IsNullOrEmpty(qidSTR)) return "false";
            int qid = 0; if (!int.TryParse(qidSTR, out qid)) return "false";

            /*
             * (1) verify such a qid exists in DB
             * (2) if qid exists and number of answers to the qid < BasicAction.max_allowed_answers
             * (3) AND if email has already answered this question then update existing answer with new_answer 
             * (4) else insert new_answer
            */

            return "true";
        }

        public string SearchQuestions(string searchQuery)
        {
            DataTable searchResults = BusinessLayer.SearchQuestions(searchQuery);
            return JsonConvert.SerializeObject(searchResults);
        }
        /// <summary>
        /// url : ~/Home/GetQuestionAndAnswer
        /// </summary>
        /// <param name="qid"></param>
        /// <returns></returns>
        public String GetQuestionAndAnswer(int qid)
        {
            var dt = BusinessLayer.GetQuestionAndAnswer(qid);
            if (dt.Rows.Count <= 0)
            {
                dt = BusinessLayer.getQuestion(qid);
                QuestionAnswers qa_empty = new QuestionAnswers
                {
                    id = (long)dt.Rows[0]["id"],
                    question = dt.Rows[0]["question"] as String,
                    answers = new Answer[0]
                };
                return JsonConvert.SerializeObject(qa_empty);
            }
            QuestionAnswers qa = new QuestionAnswers
            {
                id = (long)dt.Rows[0]["id"],
                question = dt.Rows[0]["question"] as String,
                answers = JsonConvert.DeserializeObject<Answer[]>(dt.Rows[0]["answer"] as String)
            };
            return JsonConvert.SerializeObject(qa);
        }
        /// <summary>
        /// url:~/Home/GetCountOfQuestions
        /// </summary>
        /// <returns></returns>
        public string GetCountOfQuestions(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                email = SessionValues.UserEmail;
                if (String.IsNullOrEmpty(email)) return null;
            }
            return BusinessLayer.GetCountOfQuestions(email);
        }
        public string GetNextSet(int offset, int limit)
        {
            String email = SessionValues.UserEmail;
            if (String.IsNullOrEmpty(email))
            {
                return
                JsonConvert.SerializeObject(Enumerable.Range(offset, limit).Select(i => new
                {
                    id = i,
                    SNo = i,
                    question = "Your session has expired you need to log in again"
                }).ToArray());
            }
            return JsonConvert.SerializeObject(BusinessLayer.GetNextSet(SessionValues.UserEmail, offset, limit));

            //return
            //JsonConvert.SerializeObject(Enumerable.Range(offset, limit).Select(i => new
            //{
            //    id = i,
            //    SNo = i,
            //    question = "This is an amazing question_" +i 
            //}).ToArray());
        }
    }
}