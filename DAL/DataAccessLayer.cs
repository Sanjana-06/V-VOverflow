using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    //using Utils;
    using System.Data;
    using Npgsql;
    //DataBase name, schema name , table name and column name JAVE TO BE IN SMALL LETTERS.
    public class DataAccessLayer
    {
        //public static string conString = "Host=localhost;Username=postgres;Password=root@123;Database=dvdrental;Pooling=True;MinPoolSize=1;MaxPoolSize=20";
        public static string conString = "Host=localhost;Port=5432;Database=vnv;Username=postgres;Password=root@123;Pooling=True;MinPoolSize=1;MaxPoolSize=20";
        public static void AdaptTheCommand(NpgsqlCommand command, object param)
        {
            if (param == null) return;
            var pInfos = param.GetType().GetProperties();
            foreach (var pInfo in pInfos)
            {
                var pVal = pInfo.GetValue(param);
                //command.Parameters.AddWithValue("@" + pInfo.Name, "%"+pVal+"%");
                command.Parameters.AddWithValue("@" + pInfo.Name, pVal);
            }
        }
        public static string GetConnectionString()
        {
            return conString;
        }
        /// <summary>
        /// Example of param
        /// var param = new
        ///    {
        ///        @actor_id = 1,
        ///        @first_name = "penelope"
        ///    };
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static DataTable GetDataTable(string sql, Object param)
        {
            DataTable dt = new DataTable();
            using (NpgsqlConnection cnn = new NpgsqlConnection(GetConnectionString()))
            {
                cnn.Open();
                using (NpgsqlCommand mycommand = new NpgsqlCommand(sql, cnn))
                {
                    DataAccessLayer.AdaptTheCommand(mycommand, param);
                    using (NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(mycommand))
                    {
                        adapter.AcceptChangesDuringFill = true;
                        adapter.Fill(dt);
                        adapter.Dispose();
                        cnn.Close();
                        return dt;
                    }
                }
            }
        }
        public static DataTable GetDataTable(string sql)
        {
            DataTable dt = new DataTable();
            using (NpgsqlConnection cnn = new NpgsqlConnection(GetConnectionString()))
            {
                cnn.Open();
                using (NpgsqlCommand mycommand = new NpgsqlCommand(sql, cnn))
                {
                    using (NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(mycommand))
                    {
                        adapter.AcceptChangesDuringFill = true;
                        adapter.Fill(dt);
                        adapter.Dispose();
                        cnn.Close();
                        return dt;
                    }
                }
            }
        }
        public static DataTable GetDataTable(NpgsqlCommand mycommand)
        {
            DataTable dt = new DataTable();
            using (NpgsqlConnection cnn = new NpgsqlConnection(GetConnectionString()))
            {
                cnn.Open();
                mycommand.Connection = cnn;
                using (NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(mycommand))
                {
                    adapter.AcceptChangesDuringFill = true;
                    adapter.Fill(dt);
                    adapter.Dispose();
                    cnn.Close();
                    mycommand.Dispose();
                    return dt;
                }
            }
        }
        public static int InsertSQL(string sql)
        {
            using (NpgsqlConnection cnn = new NpgsqlConnection(GetConnectionString()))
            {
                cnn.Open();
                using (NpgsqlCommand mycommand = new NpgsqlCommand(sql, cnn))
                {
                    int value = mycommand.ExecuteNonQuery();
                    cnn.Close();
                    return value;
                }
            }
        }
        public static string ExecuteScalar(string sql, Object param)
        {
            using (NpgsqlConnection cnn = new NpgsqlConnection(GetConnectionString()))
            {
                cnn.Open();
                using (NpgsqlCommand mycommand = new NpgsqlCommand(sql, cnn))
                {
                    DataAccessLayer.AdaptTheCommand(mycommand, param);
                    object value = mycommand.ExecuteScalar();
                    cnn.Close();
                    if (value != null) return value.ToString();
                    return "";
                }
            }
        }
        public static string ExecuteScalar(string sql)
        {
            using (NpgsqlConnection cnn = new NpgsqlConnection(GetConnectionString()))
            {
                cnn.Open();
                using (NpgsqlCommand mycommand = new NpgsqlCommand(sql, cnn))
                {
                    object value = mycommand.ExecuteScalar();
                    cnn.Close();
                    if (value != null) return value.ToString();
                    return "";
                }
            }
        }
        public static int UpDdateSQl(string sql, Object param)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(GetConnectionString()))
            {
                connection.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(sql, connection))
                {
                    DataAccessLayer.AdaptTheCommand(command, param);
                    int value = command.ExecuteNonQuery();
                    connection.Close();
                    return value;
                }
            }
        }
        public static int ExecuteNonQuery(string sql, Object param)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(GetConnectionString()))
            {
                connection.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(sql, connection))
                {
                    DataAccessLayer.AdaptTheCommand(command, param);
                    int value = command.ExecuteNonQuery();
                    connection.Close();
                    return value;
                }
            }
        }
    }
    public class BulkDataAccessLayer
    {
        [ThreadStatic]
        public static string conString = "Host=localhost;Username=postgres;Password=root@123;Database=testdb;Pooling=True;MinimumPoolSize=10;maximumpoolsize=50;";

        [ThreadStatic]
        public static NpgsqlTransaction transaction = null;
        [ThreadStatic]
        public static NpgsqlCommand commander = null;
        [ThreadStatic]
        public static NpgsqlConnection cnn = null;
        [ThreadStatic]
        public static bool isInitialized = false;
        public static int BeginATransactionAndInsertSQL(string sql, Object param)
        {
            if (!isInitialized)
            {
                if (null == cnn)
                {
                    cnn = new NpgsqlConnection(conString);
                    cnn.Open();
                }
                if (null == commander)
                {
                    commander = new NpgsqlCommand(sql, cnn);
                    DataAccessLayer.AdaptTheCommand(commander, param);
                }
                if (null == transaction) transaction = cnn.BeginTransaction();
                isInitialized = true;
            }
            //commander.Transaction = transaction;
            return commander.ExecuteNonQuery();
        }
        public static void EndTransaction()
        {
            if (cnn == null || transaction == null) return;
            transaction.Commit();
            commander.Dispose();
            cnn.Close();
            isInitialized = false;
        }
    }
}
