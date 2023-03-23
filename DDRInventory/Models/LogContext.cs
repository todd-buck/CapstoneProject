using DDRInventory.Objects;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;

namespace DDRInventory.Models
{
    public class LogContext
    {
        public static List<string> GetAll()
        {
            {
                using (Database db = new Database())
                {
                    using (SQLiteCommand allLogsQuery = db._connection.CreateCommand())
                    {
                        allLogsQuery.CommandText = "SELECT * FROM log";
                        allLogsQuery.ExecuteNonQuery();
                        SQLiteDataReader reader = allLogsQuery.ExecuteReader();
                        List<string> logEntries = new List<string>();
                        while (reader.Read())
                        {
                            logEntries.Add(new Log()
                            {
                                Date = reader.GetString(0),
                                Time = reader.GetString(1),
                                User = reader.GetString(2),
                                Action = reader.GetString(3),
                                ItemName = reader.GetString(4).ToString(),
                                LocationName = reader.GetValue(5).ToString(),
                                Adjustment = reader.GetValue(6).ToString(),
                                Reason = reader.GetValue(7).ToString()
                            }.ToString());
                        }
                        return logEntries;
                    }
                }
            }
        }
    }
}
