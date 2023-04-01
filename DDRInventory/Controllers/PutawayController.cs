using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.Reflection;

namespace DDRInventory.Controllers
{
    [Route("/api/putaway")]
    [ApiController]
    public class PutawayController : ControllerBase
    {
        [HttpPost("add")]
        public bool Add(PutawayEntry newEntry)
        {
            try
            {
                PutawayEntryContext.Add(newEntry);
                return true;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }

        [HttpGet("location/{locationId}")]
        public PutawayEntry[] GetByLocation(int locationId)
        {
            try
            {
                return PutawayEntryContext.GetByLocation(locationId).ToArray();
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new PutawayEntry[0];
            }
        }

        [HttpGet("item/{itemId}")]
        public PutawayEntry[] GetByItem(string itemId)
        {
            try
            {
                return PutawayEntryContext.GetByItem(itemId).ToArray();
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new PutawayEntry[0];
            }
        }

        [HttpGet("schema")]
        public string[] GetSchema()
        {
            List<string> attributeNames = new List<string>();
            foreach (PropertyInfo property in typeof(PutawayEntry).GetProperties())
            {
                attributeNames.Add(property.Name);
            }
            return attributeNames.ToArray();
        }

        [HttpPut("update")]
        public bool Update(PutawayEntry updatedEntry)
        {
            try
            {
                return PutawayEntryContext.UpdateEntry(updatedEntry);
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }

        [HttpDelete("delete/all")]
        public bool DeleteAll()
        {
            try
            {
                PutawayEntryContext.DeleteAll();
                return true;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }

        //TEMPORARY
        [HttpGet("fix")]
        public bool fixNames()
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand updatePutawayCommand = catalog._connection.CreateCommand())
                {
                    SQLiteCommand selectPut = catalog._connection.CreateCommand();
                    selectPut.CommandText = "SELECT * FROM putaway";

                    List<PutawayEntry> entries = new List<PutawayEntry>();
                    using (SQLiteDataReader reader = selectPut.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            entries.Add(new PutawayEntry
                            {
                                ItemId = reader.GetString(1),
                                LocationId = reader.GetInt32(2),
                                LocationName = reader.GetString(3),
                                QuantityInLocation = reader.GetInt32(4)
                            });
                        }
                    }

                    foreach (PutawayEntry entry in entries)
                    {
                        entry.ItemName = InventoryItemContext.GetItem(entry.ItemId).Name;
                        updatePutawayCommand.CommandText = $"UPDATE putaway SET item_name = $item_name WHERE item_id = $item_id AND location_id = $location_id;";
                        updatePutawayCommand.Parameters.AddWithValue("$item_name", entry.ItemName);
                        updatePutawayCommand.Parameters.AddWithValue("$item_id", entry.ItemId);
                        updatePutawayCommand.Parameters.AddWithValue("$location_id", entry.LocationId);
                        updatePutawayCommand.ExecuteNonQuery();
                        Console.WriteLine($"Name {entry.ItemName} assigned to puataway entry with item {entry.ItemId} in {entry.LocationName}");
                    }
                    return true;
                }
            }
        }
    }
}
