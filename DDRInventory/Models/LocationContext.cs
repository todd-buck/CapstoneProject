using DDRInventory.Objects;
using System.Data.SQLite;

namespace DDRInventory.Models
{
    public class LocationContext
    {
        public static List<Location> GetAllLocations()
        {
            //each time we use the database i will have two using directives, the first using directive is for the db object, the second using directive is for the SQLite command
            using (Database catalog = new Database()) 
            {
                using (SQLiteCommand allLocationQuery = catalog._connection.CreateCommand())
                {
                    Console.WriteLine("Getting all locations from the database");
                    List<Location> locations = new List<Location>();
                    allLocationQuery.CommandText = "SELECT * FROM locations";
                    SQLiteDataReader reader = allLocationQuery.ExecuteReader();
                    while (reader.Read())
                    {
                        locations.Add(new Location()
                        {
                           Id = reader.GetInt32(0),
                           Name = reader.GetString(1)
                        });
                    }
                    return locations;
                }
            }
        }

        public static void AddItem(Location newLocation)
        {
            //each time we use the database i will have two using directives, the first using directive is for the db object, the second using directive is for the SQLite command
            using (Database catalog = new Database())
            {
                using (SQLiteCommand addLocationCommand = catalog._connection.CreateCommand())
                {
                    Console.WriteLine($"Adding location to '{newLocation.Name}' to the database");
                    addLocationCommand.CommandText = "INSERT INTO locations (id, name) VALUES($id, $name)";
                    addLocationCommand.Parameters.AddWithValue("$id", newLocation.Id);
                    addLocationCommand.Parameters.AddWithValue("$name", newLocation.Name);
                    addLocationCommand.ExecuteNonQuery();
                }
            }
        }
    }
}
