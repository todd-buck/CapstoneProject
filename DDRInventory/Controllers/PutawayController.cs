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
    }
}
