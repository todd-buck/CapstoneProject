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

        public static Location GetLocation(int id)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand locationQuery = catalog._connection.CreateCommand())
                {
                    Console.WriteLine($"Retrieving location {id} from the database");
                    locationQuery.CommandText = $"SELECT * FROM locations WHERE id = {id}";
                    using (SQLiteDataReader reader = locationQuery.ExecuteReader()) 
                    {
                        if (reader.Read())
                        {
                            Console.WriteLine($"Location {id} ({reader.GetString(1)}) found");
                            return new Location()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1)
                            };
                        }
                        else
                        {
                            throw new LocationNotFoundException($"Location {id} not found", id.ToString());
                        }
                    }

                }
            }

        }

        public static bool DeleteLocation(int id)
        {
            Console.WriteLine($"Deleting Location with id, {id}");
            try
            {
                GetLocation(id);
            }
            catch (ItemNotFoundException e)
            {
                Console.WriteLine($"Item with id {e.Id} does not exists. Delete operation terminated.");
                return false;
            }
            using (Database catalog = new Database())
            {
                using (SQLiteCommand addLocationCommand = catalog._connection.CreateCommand())
                {
                    addLocationCommand.CommandText = $"DELETE FROM locations WHERE id = {id};";
                    addLocationCommand.ExecuteNonQuery();
                    Console.WriteLine($"Location with id {id} removed from the database.");
                    return true;
                }
            }
        }

        public static Location GetName(int id)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand locationQuery = catalog._connection.CreateCommand())
                {
                    Console.WriteLine($"Retrieving name of location {id} from the database");
                    locationQuery.CommandText = $"SELECT name FROM locations WHERE id = {id}";
                    using (SQLiteDataReader reader = locationQuery.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Console.WriteLine($"Location name {id} ({reader.GetString(1)}) found");
                            return new Location()
                            {
                                Name = reader.GetString(1)
                            };
                        }
                        else
                        {
                            throw new LocationNotFoundException($"Location {id} not found", id.ToString());
                        }
                    }

                }
            }

        }
    }
}


