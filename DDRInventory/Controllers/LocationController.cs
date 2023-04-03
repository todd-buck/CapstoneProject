using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DDRInventory.Models;
using System.Data.SQLite;
using System.Reflection;

namespace DDRInventory.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        [HttpPost("add/{locationName}")]
        public bool Add(string locationName)
        {
            try
            {
                if (LocationContext.AddLocation(locationName))
                    return true;
                else
                    return false;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }

        [HttpGet("catalog")]
        public Location[] GetCatalog()
        {
            try
            {
                Location[] returnValue = LocationContext.GetAllLocations().ToArray();
                return returnValue;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new Location[0];
            }
        }

        [HttpGet("getName/{id}")]
        public string GetName(int id)
        {
            try
            {
                return LocationContext.GetLocation(id).Name;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return "";
            }
            catch (LocationNotFoundException)
            {
                return "";
            }
        }

        [HttpGet("schema")]
        public string[] GetSchema()
        {
            List<string> attributeNames = new List<string>();
            foreach (PropertyInfo property in typeof(Location).GetProperties())
            {
                attributeNames.Add(property.Name);
            }
            return attributeNames.ToArray();
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            bool returnVal;
            try
            {
                returnVal = LocationContext.DeleteLocation(id);
            }
            catch (ItemNotFoundException e)
            {
                Log.WriteVerbose($"Item not found. Exception: {e.Message}");
                Response.StatusCode = 451;
                return false;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
            return returnVal;
        }

        [HttpDelete("delete/all")]
        public bool DeleteAll()
        {
            try
            {
                LocationContext.DeleteAll();
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


