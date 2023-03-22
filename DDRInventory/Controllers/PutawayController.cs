using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;

namespace DDRInventory.Controllers
{
    [ApiController]
    public class PutawayController : ControllerBase
    {
        [HttpGet("/api/putaway/add")]
        public void add(PutawayEntry newEntry)
        {
            try
            {
                PutawayEntryContext.Add(newEntry);
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
            }
        }

        [HttpPut("/api/putaway/update")]
        public bool update(PutawayEntry updatedEntry)
        {
            try
            {
                return PutawayEntryContext.UpdateEntry(updatedEntry);
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }
    }
}
