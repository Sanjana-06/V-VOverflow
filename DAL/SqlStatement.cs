using Models;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace DAL
{
    public class SqlStatement
    {
        public static readonly string InsertQuestion = "INSERT INTO questions (mail, question,category) VALUES (@email, @question,@category)";
        public static readonly string SelectAllQuestions = "SELECT * FROM questions ORDER BY insert_time_stamp LIMIT 100";
        //public static readonly string getQuestionAnswers = "SELECT id, answer from answers where qid = @qid";
        public static readonly string getQuestionAnswers = @"SELECT a.id, q.question, a.qid, a.answer from answers as a Inner join questions as q on a.qid = q.id where a.qid = @qid ;";
        public static readonly string getQuestion = @"SELECT id, question from questions where id = @id;";

        //public static readonly string SearchQuestions = "SELECT mail, question, category, Timestamp FROM questions WHERE question_vector @@ to_tsquery($$@searchQuery$$)"; //@searchQuery
        public static readonly string VerifyUser = "SELECT * from all_users where email = @user_email AND pwd = @user_pwd";
        public static readonly string GetCountOfQuestions = "SELECT Count(*) from questions where mail = @email";
        public static readonly string GetNextSet = "select  row_number() OVER () as SNo , id, question from questions where mail = @email  limit = @limit offset = @offset;";
    }
}

/*
    SELECT id, question, mail, question_vector, category, insert_time_stamp	FROM public.questions;
	
    SELECT * FROM public.questions where question_vector @@ to_tsquery('english', 'today');	
    SELECT * FROM public.questions where question_vector @@ to_tsquery('english', 'nice & forward');	
    SELECT * FROM public.questions where question_vector 
	    @@( to_tsquery('english', 'nice ') ||
	     to_tsquery('english', 'today'));	
    SELECT * FROM public.questions where question_vector @@ phraseto_tsquery('english', 'a nice way');	
    SELECT * FROM public.questions where question_vector @@ phraseto_tsquery('english', 'I weather');	
*/










































//using System;
//using System.Collections.Generic;
//using System.Data.SqlTypes;
//using System.Linq;
//using System.Web;

//namespace VnVOverflow.DAL
//{
//    public class SqlStatement
//    {
//        public static readonly string addUserInfo = "INSERT INTO users(name, email, designation, message, phone, addedon) VALUES (@name, @email, @designation, @message, @phone, @addedon);";
//        public static readonly string totalVisit = "UPDATE totalvisit SET count = count + 1 WHERE id = 1;";
//        public static readonly string getTotalVisit = "SELECT count FROM tekbytes.totalvisit;";
//        public static readonly string getThumbsUp = "SELECT * from tekbytes.thumbsup where user_identity = @user_identity";
//        public static readonly string getAllThumbsUp = "SELECT * from tekbytes.thumbsup";

//        public static readonly string getUIDLikes = "SELECT * from tekbytes.thumbsup where user_identity = &UID";
//        public static readonly string updateUIDLikes = "UPDATE tekbytes.thumbsup SET likes = likes + 1 WHERE user_identity = @user_identity;";
//        public static readonly string insertUIDLikes = "INSERT INTO tekbytes.thumbsup (user_identity, likes) VALUES (@user_identity, @likes);";
//    }
//}