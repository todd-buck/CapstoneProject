using System.Collections.ObjectModel;
using System.Data.SQLite;
using System.IO;
using System.Reflection;
using System.Text;
namespace DDRInventory.Models
{
    public class Database : IDisposable
    {
        //CONSTANTS

        public static Dictionary<string, string> TABLES = new Dictionary<string, string>
        {
            { "items", "(id VARCHAR(20), name VARCHAR(20), quantity INT, price REAL, unit VARCHAR(10), category VARCHAR(15), subcategory VARCHAR(15), par_level INT)" },
            { "locations", "(id VARCHAR(20), location VARCHAR(20))" },
            { "putaway", "(itemId VARCHAR(20), locationId VARCHAR(20), quantity INT)" }
        };
     
        //Database version notes
        //2. Added category, subcategory, par_level
        const string DATABASE_NAME = "catalogV3.db";
        string DATABASE_PATH = Directory.GetCurrentDirectory();

        //MEMBER ATTRIBUTES
        public SQLiteConnection _connection;

        //CONSTRUCTORS
        public Database()
        {
            Open();
        }

        private void CheckVersion()
        {
            foreach (string dbFile in Directory.GetFiles(DATABASE_PATH, "*.db"))
            {
                if (Path.GetFileName(dbFile) != DATABASE_NAME)
                {
                    File.Delete(dbFile);
                    Console.WriteLine($"Delete obselete database file {Path.GetFileName(dbFile)}");
                }
            }
        }

        public void Init()
        {
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
        void Open()
        {
            //Console.WriteLine($"Opening database {DATABASE_NAME} for read/write");
            // Create a new database connection:
            _connection = new SQLiteConnection($"Data Source={ DATABASE_PATH + '\\' + DATABASE_NAME }; Version = 3; New = True; Compress = True; ");
            // Open the connection:
            try
            {
                _connection.Open();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unspecified SQL error when creating or opening databse file");
            }
            //Console.WriteLine($"Opened {DATABASE_NAME} sucessfully");
        }

        void CreateTable(string name, string types)
        {
            SQLiteCommand createTableCommand = _connection.CreateCommand();
            createTableCommand.CommandText = "CREATE TABLE " + name + " " + types;
            //Console.WriteLine("The sql command is " + createTableCommand.CommandText);
            createTableCommand.ExecuteNonQuery();
        }
    }
}
