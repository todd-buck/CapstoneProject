using DDRInventory.Models;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Xml.Linq;

namespace DDRInventory.Objects
{
    public class Log
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public string User { get; set; }
        public string Action { get; set; }
        public string? ItemName { get; set; }
        public string? LocationName { get; set; }
        public string? Adjustment { get; set; }
        public string? Reason { get; set; }
        public void Write(string message, bool verboseOnly = false)
        {
            Console.WriteLine(message);
            if (verboseOnly) return;
            using (Database db = new Database())
            {
                using (SQLiteCommand addLogEntry = db._connection.CreateCommand())
                {
                    addLogEntry.CommandText = "INSERT INTO log (date, time, user, action, item_name, location_name, adjustment, reason) VALUES($date, $time," +
                        "$user, $action, $item_name, $location_name, $adjustment, $reason)";
                    addLogEntry.Parameters.AddWithValue("$date", DateTime.Now.ToString("MM-dd-yyyy"));
                    addLogEntry.Parameters.AddWithValue("$time", DateTime.Now.ToString("HH:mm:ss"));
                    addLogEntry.Parameters.AddWithValue("$user", User);
                    addLogEntry.Parameters.AddWithValue("$action", Action); 
                    addLogEntry.Parameters.AddWithValue("$item_name", ItemName);
                    addLogEntry.Parameters.AddWithValue("$location_name", LocationName);
                    addLogEntry.Parameters.AddWithValue("$adjustment", Adjustment);
                    addLogEntry.Parameters.AddWithValue("$reason", Reason);
                    addLogEntry.ExecuteNonQuery();
                }
            }
        }
        public override string ToString()
        {
            return $"{Date} {Time} {User} {Action} {ItemName} {LocationName} {Adjustment} {Reason}".Trim();
        }
    }
}
