using DDRInventory.Objects;
using System.Data.SQLite;

namespace DDRInventory.Models
{
    public class LocationContext
    {
        public static List<Location> GetAllLocations()
        {
            using (Database catalog = new Database()) 
            {
                using (SQLiteCommand allLocationQuery = catalog._connection.CreateCommand())
                {
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
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Opened Location Catalog"
                    }.Write($"Retrieving all locations from the database");
                    return locations;
                }
            }
        }

        public static void AddLocation(Location newLocation)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand addLocationCommand = catalog._connection.CreateCommand())
                {
                    addLocationCommand.CommandText = "INSERT INTO locations (id, name) VALUES($id, $name)";
                    addLocationCommand.Parameters.AddWithValue("$id", newLocation.Id);
                    addLocationCommand.Parameters.AddWithValue("$name", newLocation.Name);
                    addLocationCommand.ExecuteNonQuery();
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Location Addition",
                        LocationName = newLocation.Name
                    }.Write($"Adding location '{newLocation.Name}' to the database");
                }
            }
        }

        public static Location GetLocation(int id)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand locationQuery = catalog._connection.CreateCommand())
                {
                    Log.WriteVerbose($"Retrieving location {id} from the database");
                    locationQuery.CommandText = $"SELECT * FROM locations WHERE id = {id}";
                    using (SQLiteDataReader reader = locationQuery.ExecuteReader()) 
                    {
                        if (reader.Read())
                        {
                            Log.WriteVerbose($"Location {id} ({reader.GetString(1)}) found");
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
            Log.WriteVerbose($"Deleting Location with id, {id}");
            try
            {
                GetLocation(id);
            }
            catch (ItemNotFoundException e)
            {
                Log.WriteVerbose($"Item with id {e.Id} does not exists. Delete operation terminated.");
                return false;
            }
            using (Database catalog = new Database())
            {
                using (SQLiteCommand addLocationCommand = catalog._connection.CreateCommand())
                {
                    addLocationCommand.CommandText = $"DELETE FROM locations WHERE id = {id};";
                    addLocationCommand.ExecuteNonQuery();
                    Log.WriteVerbose($"Location with id {id} removed from the database.");
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Location Deletion",
                        LocationName = GetName(id).Name
                    }.Write($"Deleted a location from the database");
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
                    Log.WriteVerbose($"Retrieving name of location {id} from the database");
                    locationQuery.CommandText = $"SELECT name FROM locations WHERE id = {id}";
                    using (SQLiteDataReader reader = locationQuery.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Log.WriteVerbose($"Location name {id} ({reader.GetString(1)}) found");

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


