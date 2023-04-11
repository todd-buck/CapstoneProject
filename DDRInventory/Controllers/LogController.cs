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
        [HttpDelete("clear")]
        public bool clear()
        {
            try
            {
                LogContext.Clear();
            }
            catch (SQLiteException e)
            {
                Response.StatusCode = 512;
            }
            return true;
        }

        [HttpGet("all")]
        public Log[] GetAll()
        {
            try
            {
                return LogContext.GetAll().ToArray();
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new Log[0];
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
