using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DDRInventory.Models;
using System.Data.SQLite;

namespace DDRInventory.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        [HttpGet("catalog")]
        public Location[] getCatalog()
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

        [HttpPost("add/{locationName}")]
        public bool add(string locationName)
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

        [HttpDelete("delete/{id}")]
        public bool delete(int id)
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

        [HttpGet("getName/{id}")]
        public string getName(int id)
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

        [HttpDelete("delete/all")]
        public bool deleteAll()
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


