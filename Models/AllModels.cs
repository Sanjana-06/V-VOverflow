using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Models
{
    public class Question
    {
        public string Email { get; set; }
        public string QuestionText { get; set; }
        public string Category { get; set; }
        public DateTime Timestamp { get; set; }
        public string TimestampDifference { get; set; } // Add TimestampDifference property
    }
    public class Answer
    {
        public string mail { get; set; }
        public string name { get; set; }
        public string answer { get; set; }
    }
    public class QuestionAnswers
    {
        public long id { get; set; }
        public String question { get; set; }
        public Answer[] answers { get; set;}
    }
}