using System.Data.SQLite;
using Console = Colorful.Console;
using System.Drawing;
namespace DDRInventory.Models
{
    public class Database : IDisposable
    {
        //CONSTANTS

        public static Dictionary<string, string> TABLES = new Dictionary<string, string>
        {
            { "items", "(id VARCHAR(20), name VARCHAR(20), quantity INT, price REAL, unit VARCHAR(10), category VARCHAR(15), subcategory VARCHAR(15), par_level INT)" },
            { "locations", "(id INT, name VARCHAR(20))" },
            { "putaway", "(item_name VARCHAR(20), item_id VARCHAR(20), location_id INT, location_name VARCHAR(20), quantity INT)" },
            { "log", "(date VARCHAR(20), time VARCHAR(20), user VARCHAR(20), action VARCHAR(20), item_name VARCHAR(20), location_name VARCHAR(20), adjustment VARCHAR(20), reason VARCHAR(20))" }
        };
     
        //Database version notes
        //2. Added category, subcategory, par_level
        static string DATABASE_NAME = "catalogV5.db";
        static string DATABASE_PATH = Directory.GetCurrentDirectory();

        //MEMBER ATTRIBUTES
        public SQLiteConnection _connection;

        //CONSTRUCTORS
        public Database()
        {
            _connection = new SQLiteConnection($"Data Source={DATABASE_PATH}{DirectorySeparatorChar}{DATABASE_NAME}; Version = 3; New = True; Compress = True; ");
            // Open the connection:
            try
            {
                _connection.Open();
            }
            catch (Exception)
            {
                Console.WriteLine("Unspecified SQL error when creating or opening databse file");
            }
        }

        private void CheckVersion()
        {
            foreach (string dbFile in Directory.GetFiles(DATABASE_PATH, "catalog*.db"))
            {
                if (Path.GetFileName(dbFile) != DATABASE_NAME)
                {
                    File.Delete(dbFile);
                    Console.WriteLine($"Deleting obselete database file {Path.GetFileName(dbFile)}");
                }
            }
        }

        public void Init()
        {
            File.Copy($"{DATABASE_PATH}{DirectorySeparatorChar}DefaultDatabase.db", $"{DATABASE_PATH}{Path.DirectorySeparatorChar}{DATABASE_NAME}", true);
            CheckVersion();
            List<string> tablesInDatabase = GetTableNames();

            foreach (string name in TABLES.Keys)
            {
                Console.WriteLine("Checking if table '" + name + "' exists...");
                if (tablesInDatabase.Contains(name))
                {
                    Console.WriteLine("Table '" + name + "' exists.");
                }
                else
                {
                    Console.WriteLine("Table '" + name + "' does not exist. Creating table...");
                    CreateTable(name, TABLES[name]);
                    Console.WriteLine("Table '" + name + "' created successfully.");
                }
            }
            Dispose();
        }

        // MEMBER FUNCTIONS
        List<string> GetTableNames()
        {
            List<string> tableNames = new List<string>();
            SQLiteCommand tableNameQuery = _connection.CreateCommand();
            tableNameQuery.CommandText = "SELECT name FROM sqlite_master WHERE type='table';";

            SQLiteDataReader sqlite_datareader = tableNameQuery.ExecuteReader();
            while (sqlite_datareader.Read())
            {
                tableNames.Add(sqlite_datareader.GetString(0));
            }
            return tableNames;
        }

        public void Dispose()
        {
            _connection.Dispose();
            //Console.WriteLine($"Connection to {DATABASE_NAME} disposed");
        }

        void CreateTable(string name, string types)
        {
            SQLiteCommand createTableCommand = _connection.CreateCommand();
            createTableCommand.CommandText = "CREATE TABLE " + name + " " + types;
            //Console.WriteLine("The sql command is " + createTableCommand.CommandText);
            createTableCommand.ExecuteNonQuery();
        }

        public static async void RefreshAsync()
        {
            while (true)
            {
                // Get the current time
                DateTime now = DateTime.Now;

                // Calculate the time until the next 2:30 AM
                TimeSpan timeUntil230AM = new DateTime(now.Year, now.Month, now.Day, 2, 30, 0) - now;

                // If it's already past 2:30 AM, add a day to the time until the next 2:30 AM
                if (timeUntil230AM < TimeSpan.Zero)
                {
                    timeUntil230AM += TimeSpan.FromDays(1);
                }

                // Sleep until 2:30 AM
                await Task.Delay(timeUntil230AM);

                // Print "30 more minutes"
                Console.WriteLine("INFO: The database will be refreshed to its default state in 30 minutes", Color.Red);

                // Sleep for 30 minutes
                await Task.Delay(TimeSpan.FromMinutes(30));

                // actually do the refresh
                Console.WriteLine("Initiating database refresh...");
                Console.WriteLine($"DEFAULT DATABASE PATH: {DATABASE_PATH}{DirectorySeparatorChar}DefaultDatabase.db");
                Console.WriteLine($"WORKING DATABASE PATH: {DATABASE_PATH}{DirectorySeparatorChar}{DATABASE_NAME}");
                File.Copy($"{DATABASE_PATH}{DirectorySeparatorChar}DefaultDatabase.db", $"{DATABASE_PATH}{DirectorySeparatorChar}{DATABASE_NAME}", true);
                Console.WriteLine("INFO: Database refresh complete. Next reset in 24 hours.");

                // Calculate the time until the next 2:30 AM
                TimeSpan timeUntilNext230AM = TimeSpan.FromDays(1) - timeUntil230AM - TimeSpan.FromMinutes(30);

                // Sleep until the next 2:30 AM
                await Task.Delay(timeUntilNext230AM);
            }
        }
    }
}
