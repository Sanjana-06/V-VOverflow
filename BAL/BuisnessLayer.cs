using System.Collections.Generic;
using System;
using DAL;

namespace BAL
{
    using Microsoft.Ajax.Utilities;
    using Models;
    using Newtonsoft.Json;
    using System.Data;

    public class BusinessLayer
    {
        public static int InsertQuestion(string email, string question, string category) { return DataAccessLayer.ExecuteNonQuery(SqlStatement.InsertQuestion, new { @email = email, @question = question, @category = category }); }
        public static DataTable GetAllQuestions() { return DataAccessLayer.GetDataTable(SqlStatement.SelectAllQuestions); }
        public static DataTable SearchQuestions(string searchQuery) { return DataAccessLayer.GetDataTable(searchQuery); }
        public static DataTable GetQuestionAndAnswer(int qid) { return DataAccessLayer.GetDataTable(SqlStatement.getQuestionAnswers, new { @Qid = qid }); }
        public static DataTable getQuestion(int id) { return DataAccessLayer.GetDataTable(SqlStatement.getQuestion, new { @id = id }); }
        public static String VerifyUser(String email, String pwd)
        {
            //return email.Split('@')[0];
            var dt = DataAccessLayer.GetDataTable(SqlStatement.VerifyUser, new { @user_email = email, @user_pwd = pwd });
            if (dt != null && dt.Rows.Count >= 0) return dt.Rows[0]["name"] as String;
            return null;
        }
        public static string GetCountOfQuestions(String email)
        {
            return DataAccessLayer.ExecuteScalar(SqlStatement.GetCountOfQuestions, new { @email = email });
        }
        public static DataTable GetNextSet(String email , int limit, int offset)
        {
            return DataAccessLayer.GetDataTable(SqlStatement.GetNextSet, new { @email = email , @limit =  limit, @offset = offset});
        }
    }
}