using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;

namespace DDRInventory.Controllers
{
    [Route("/api/putaway")]
    [ApiController]
    public class PutawayController : ControllerBase
    {
        [HttpPost("add")]
        public bool add(PutawayEntry newEntry)
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
        public PutawayEntry[] getByLocation(int locationId)
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
        public PutawayEntry[] getByItem(string itemId)
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

        [HttpPut("update")]
        public bool update(PutawayEntry updatedEntry)
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
        public bool deleteAll()
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
