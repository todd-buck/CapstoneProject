using DDRInventory.Objects;
using System.Data.SQLite;

namespace DDRInventory.Models
{
    public class PutawayEntryContext
    {
        public static void Add(PutawayEntry newEntry)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand insertEntryCommand = catalog._connection.CreateCommand())
                {
                    insertEntryCommand.CommandText = "INSERT INTO putaway (item_id, location_id, quantity) VALUES($iid, $lid, $quantity);";
                    insertEntryCommand.Parameters.AddWithValue("$iid", newEntry.ItemId);
                    insertEntryCommand.Parameters.AddWithValue("$lid", newEntry.LocationId);
                    insertEntryCommand.Parameters.AddWithValue("$quantity", newEntry.QuantityInLocation);
                    Console.WriteLine($"Putting away {newEntry.QuantityInLocation} of item {newEntry.ItemId} in location {newEntry.LocationName}");
                    insertEntryCommand.ExecuteNonQuery();
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Putaway Adjustment",
                        ItemName = InventoryItemContext.GetItem(newEntry.ItemId).Name,
                        LocationName = newEntry.LocationName,
                        Adjustment = newEntry.QuantityInLocation.ToString()
                    }.Write($"Putting away {newEntry.QuantityInLocation} of item {newEntry.ItemId} in location {newEntry.LocationName}");
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
            using (Database catalog = new Database())
            {
                using (SQLiteCommand updatePutawayCommand = catalog._connection.CreateCommand())
                {
                    updatePutawayCommand.CommandText = $"UPDATE putaway SET quantity = $quantity WHERE item_id = $item_id AND location_id = $location_id;";
                    updatePutawayCommand.Parameters.AddWithValue("$quantity", updatedEntry.QuantityInLocation);
                    updatePutawayCommand.Parameters.AddWithValue("$item_id", updatedEntry.ItemId);
                    updatePutawayCommand.Parameters.AddWithValue("$location_id", updatedEntry.LocationId);
                    Console.WriteLine($"Updating putway for {updatedEntry.ItemId} in {updatedEntry.LocationName} to {updatedEntry.QuantityInLocation}");
                    updatePutawayCommand.ExecuteNonQuery();
                    new Log
                    {
                        User = "DummyUser",
                        Action = "Putaway Adjustment",
                        ItemName = InventoryItemContext.GetItem(updatedEntry.ItemId).Name,
                        LocationName = updatedEntry.LocationName,
                        Adjustment = (updatedEntry.QuantityInLocation - GetEntry(updatedEntry.ItemId, updatedEntry.LocationId).QuantityInLocation).ToString()
                    }.Write($"Putting away {updatedEntry.QuantityInLocation} of item {updatedEntry.ItemId} in location {updatedEntry.LocationName}");
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
                    putawayByItemQuery.CommandText = "SELECT * FROM putaway WHERE item_id = $item_id, location_id = $location_id ORDER BY quantity asc;";
                    putawayByItemQuery.Parameters.AddWithValue("$item_id", itemId);
                    putawayByItemQuery.Parameters.AddWithValue("$location_id", locationId);
                    using (SQLiteDataReader reader = putawayByItemQuery.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new PutawayEntry
                            {
                                ItemId = reader.GetString(0),
                                LocationId = reader.GetInt32(1),
                                LocationName = reader.GetString(2),
                                QuantityInLocation = reader.GetInt32(3)
                            };
                        }
                        return new PutawayEntry();
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
                    putawayByItemQuery.CommandText = "SELECT * FROM putaway WHERE item_id = $item_id ORDER BY quantity asc;";
                    putawayByItemQuery.Parameters.AddWithValue("$item_id", itemId);
                    using (SQLiteDataReader reader = putawayByItemQuery.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            entries.Add(new PutawayEntry
                            {
                                ItemId = reader.GetString(0),
                                LocationId = reader.GetInt32(1),
                                LocationName = reader.GetString(2),
                                QuantityInLocation = reader.GetInt32(3)
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
                    putawayByLocationQuery.CommandText = "SELECT * FROM putaway WHERE location_id = $location_id ORDER BY quantity asc;";
                    putawayByLocationQuery.Parameters.AddWithValue("$location_id", locationId);
                    using (SQLiteDataReader reader = putawayByLocationQuery.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            entries.Add(new PutawayEntry
                            {
                                ItemId = reader.GetString(0),
                                LocationId = reader.GetInt32(1),
                                LocationName = reader.GetString(2),
                                QuantityInLocation = reader.GetInt32(3)
                            });
                        }
                        return entries;
                    }
                }
            }
        }
    }
}
