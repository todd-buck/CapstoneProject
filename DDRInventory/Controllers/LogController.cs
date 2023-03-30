using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.Reflection;

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

        [HttpGet("schema")]
        public string[] GetSchema()
        {
            List<string> attributeNames = new List<string>();
            foreach (PropertyInfo property in typeof(Log).GetProperties())
            {
                attributeNames.Add(property.Name);
            }
            return attributeNames.ToArray();
        }
    }
}
