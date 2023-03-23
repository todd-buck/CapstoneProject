using DDRInventory.Models;

using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;

namespace DDRInventory.Controllers
{
    [Route("api/log")]
    [ApiController]
    public class LogController : ControllerBase
    {
        [HttpGet("all")]
        public string[] GetAll()
        {
            try
            {
                return LogContext.GetAll().ToArray();
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new string[0];
            }
        }
    }
}
