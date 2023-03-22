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
                    insertEntryCommand.CommandText = "INSERT INTO putaway (item_id, location_id, location_name, quantity) VALUES($iid, $lid, $lname, $quantity);";
                    insertEntryCommand.Parameters.AddWithValue("$idd", newEntry.ItemId);
                    insertEntryCommand.Parameters.AddWithValue("$lid", newEntry.LocationId);
                    insertEntryCommand.Parameters.AddWithValue("$lname", newEntry.LocationName);
                    insertEntryCommand.Parameters.AddWithValue("$quantity", newEntry.QuantityInLocation);
                    Console.WriteLine($"Putting away {newEntry.QuantityInLocation} of item {newEntry.ItemId} in location {newEntry.LocationName}");
                    insertEntryCommand.ExecuteNonQuery();
                }
            }
        }
        public static bool UpdateItem(PutawayEntry updatedEntry)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand updatePutawayCommand = catalog._connection.CreateCommand())
                {
                    updatePutawayCommand.CommandText = $"UPDATE putway SET quantity = $quantity WHERE item_id = $item_id, location_id = $location_id;";
                    updatePutawayCommand.Parameters.AddWithValue("$quantity", updatedEntry.QuantityInLocation);
                    updatePutawayCommand.Parameters.AddWithValue("$item_id", updatedEntry.ItemId);
                    updatePutawayCommand.Parameters.AddWithValue("$location_id", updatedEntry.LocationId);
                    Console.WriteLine($"Updating putway for {updatedEntry.ItemId} in {updatedEntry.LocationName} to {updatedEntry.QuantityInLocation}");
                    updatePutawayCommand.ExecuteNonQuery();
                    return true;
                }
            }
        }
    }
}
