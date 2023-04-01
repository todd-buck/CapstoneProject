using DDRInventory.Objects;
using System.Data.SQLite;

namespace DDRInventory.Models
{
    public class PutawayEntryContext
    {
        public static void Add(PutawayEntry newEntry)
        {
            try
            {
                UpdateEntry(newEntry);
                return;
            }
            catch (PutawayEntryNotFoundException e)
            {
                Log.WriteVerbose(e.Message + "\nCreating entry...");
            }
            using (Database catalog = new Database())
            {
                using (SQLiteCommand insertEntryCommand = catalog._connection.CreateCommand())
                {
                    insertEntryCommand.CommandText = "INSERT INTO putaway (item_id, location_id, location_name, quantity, item_name) VALUES($item_id, $location_id, $location_name, $quantity, $item_name);";
                    insertEntryCommand.Parameters.AddWithValue("$item_id", newEntry.ItemId);
                    insertEntryCommand.Parameters.AddWithValue("$location_id", newEntry.LocationId);
                    insertEntryCommand.Parameters.AddWithValue("$location_name", newEntry.LocationName);
                    insertEntryCommand.Parameters.AddWithValue("$quantity", newEntry.QuantityInLocation);
                    insertEntryCommand.Parameters.AddWithValue("$item_name", newEntry.ItemName);
                    Console.WriteLine($"Putting away {newEntry.QuantityInLocation} of item {newEntry.ItemName} in location {newEntry.LocationName}");
                    insertEntryCommand.ExecuteNonQuery();
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Putaway Adjustment",
                        ItemName = newEntry.ItemName,
                        LocationName = newEntry.LocationName,
                        Adjustment = newEntry.QuantityInLocation.ToString()
                    }.Write($"Putting away {newEntry.QuantityInLocation} of item {newEntry.ItemName} in location {newEntry.LocationName}");
                }
            }
        }

        public static bool DeleteAll()
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand deleteAllPutawayEntriesCommand = catalog._connection.CreateCommand())
                {
                    deleteAllPutawayEntriesCommand.CommandText = "DELETE FROM putaway;";
                    deleteAllPutawayEntriesCommand.ExecuteNonQuery();
                    deleteAllPutawayEntriesCommand.ExecuteNonQuery();
                    new Log
                    {
                        User = "DummyUser",
                        Action = "All Putaway Deletion"
                    }.Write("Deleting all putaway entries from the database");
                    return true;
                }
            }
        }
        public static bool UpdateEntry(PutawayEntry updatedEntry)
        {
            GetEntry(updatedEntry.ItemId, updatedEntry.LocationId);
            using (Database catalog = new Database())
            {
                using (SQLiteCommand updatePutawayCommand = catalog._connection.CreateCommand())
                {
                    updatePutawayCommand.CommandText = $"UPDATE putaway SET quantity = $quantity WHERE item_id = $item_id AND location_id = $location_id;";
                    updatePutawayCommand.Parameters.AddWithValue("$quantity", updatedEntry.QuantityInLocation);
                    updatePutawayCommand.Parameters.AddWithValue("$item_id", updatedEntry.ItemId);
                    updatePutawayCommand.Parameters.AddWithValue("$location_id", updatedEntry.LocationId);
                    Console.WriteLine($"Updating putway for {updatedEntry.ItemName} in {updatedEntry.LocationName} to {updatedEntry.QuantityInLocation}");
                    updatePutawayCommand.ExecuteNonQuery();
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Putaway Adjustment",
                        ItemName = updatedEntry.ItemName,
                        LocationName = updatedEntry.LocationName,
                        Adjustment = (updatedEntry.QuantityInLocation - GetEntry(updatedEntry.ItemId, updatedEntry.LocationId).QuantityInLocation).ToString()
                    }.Write($"Putting away {updatedEntry.QuantityInLocation} of item {updatedEntry.ItemName} in location {updatedEntry.LocationName}");
                    return true;
                }
            }
        }

        private static PutawayEntry GetEntry(string itemId, int locationId)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand putawayByItemQuery = catalog._connection.CreateCommand())
                {
                    Log.WriteVerbose($"Retrieving putaway entry for item {itemId} in location {locationId}");
                    putawayByItemQuery.CommandText = "SELECT * FROM putaway WHERE item_id = $item_id AND location_id = $location_id ORDER BY quantity asc;";
                    putawayByItemQuery.Parameters.AddWithValue("$item_id", itemId);
                    putawayByItemQuery.Parameters.AddWithValue("$location_id", locationId);
                    using (SQLiteDataReader reader = putawayByItemQuery.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new PutawayEntry
                            {
                                ItemName = reader.GetString(0),
                                ItemId = reader.GetString(1),
                                LocationId = reader.GetInt32(2),
                                LocationName = reader.GetString(3),
                                QuantityInLocation = reader.GetInt32(4)
                                
                            };
                        }
                        throw new PutawayEntryNotFoundException($"Putaway entry for item {itemId} in location {locationId} not found.",itemId, locationId);
                    }
                }
            }
        }

        public static List<PutawayEntry> GetByItem(string itemId)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand putawayByItemQuery = catalog._connection.CreateCommand())
                {
                    Log.WriteVerbose($"Retrieving all putaway entries for item {itemId}");
                    List<PutawayEntry> entries = new List<PutawayEntry>();
                    putawayByItemQuery.CommandText = "SELECT * FROM putaway WHERE item_id = $item_id ORDER BY location_name asc;";
                    putawayByItemQuery.Parameters.AddWithValue("$item_id", itemId);
                    using (SQLiteDataReader reader = putawayByItemQuery.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            entries.Add(new PutawayEntry
                            {
                                ItemName= reader.GetString(0),
                                ItemId = reader.GetString(1),
                                LocationId = reader.GetInt32(2),
                                LocationName = reader.GetString(3),
                                QuantityInLocation = reader.GetInt32(4)
                            });
                        }
                        return entries;
                    }
                }
            }
        }

        public static List<PutawayEntry> GetByLocation(int locationId)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand putawayByLocationQuery = catalog._connection.CreateCommand())
                {
                    Log.WriteVerbose($"Retrieving all putaway entries for item {locationId}");
                    List<PutawayEntry> entries = new List<PutawayEntry>();
                    putawayByLocationQuery.CommandText = "SELECT * FROM putaway WHERE location_id = $location_id ORDER BY location_name asc;";
                    putawayByLocationQuery.Parameters.AddWithValue("$location_id", locationId);
                    using (SQLiteDataReader reader = putawayByLocationQuery.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            entries.Add(new PutawayEntry
                            {
                                ItemName = reader.GetString(0),
                                ItemId = reader.GetString(1),
                                LocationId = reader.GetInt32(2),
                                LocationName = reader.GetString(3),
                                QuantityInLocation = reader.GetInt32(4)
                            });
                        }
                        return entries;
                    }
                }
            }
        }

        static bool DeleteAllEntries(int locationId)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand deleteAllEntryCommand = catalog._connection.CreateCommand())
                {
                    try
                    {
                        Log.WriteVerbose($"Removing all putaway entries.");
                        List<PutawayEntry> entries = new List<PutawayEntry>();
                        deleteAllEntryCommand.CommandText = "DELETE FROM putaway";
                        deleteAllEntryCommand.ExecuteNonQuery();
                    }
                    catch (SQLiteException)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
