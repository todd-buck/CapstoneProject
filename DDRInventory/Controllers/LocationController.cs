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
                if (returnValue.Length == 0) Response.StatusCode = 204;
                return returnValue;
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new Location[0];
            }
        }

        [HttpPost("add")]
        public int add(Location newLocation)
        {
            if (newLocation.Id == -1)
            {
                //FIX ME: ADD ID GENERATION
            }
            try
            {
                LocationContext.AddLocation(newLocation);
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return newLocation.Id;
            }
            return newLocation.Id;
        }

        [HttpDelete("delete")]
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
                Response.StatusCode = 204;
                return "";
            }
        }

        [HttpDelete("delete/all")]
        public void deleteAll()
        {
            try
            {
                LocationContext.DeleteAll();
            }
            catch (SQLiteException e)
            {
                Log.WriteVerbose($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
            }
        }
    }
}


