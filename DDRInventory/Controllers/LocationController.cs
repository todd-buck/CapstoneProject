using DDRInventory.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DDRInventory.Models;
using System.Data.SQLite;

namespace DDRInventory.Controllers
{
    [ApiController]
    public class LocationController : ControllerBase
    {
        [HttpGet("/api/location/catalog")]
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
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new Location[0];
            }
        }

        [HttpPost("/api/location/add")]
        public int add(Location newLocation)
        {
            if (newLocation.Id == -1)
            {
                //FIX ME: ADD ID GENERATION
            }
            try
            {
                LocationContext.AddItem(newLocation);
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return newLocation.Id;
            }
            return newLocation.Id;
        }

        [HttpDelete("/api/location/delete")]
        public bool delete(int id)
        {
            bool returnVal;
            try
            {
                returnVal = LocationContext.DeleteLocation(id);
            }
            catch (ItemNotFoundException e)
            {
                Console.WriteLine($"Item not found. Exception: {e.Message}");
                Response.StatusCode = 451;
                return false;
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
            return returnVal;
        }

        [HttpPut("/api/location/getName")]
        public string getName(int id, string name)
        {
            try
            {
                return LocationContext.GetLocation(id).Name;
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return null;
            }
            catch (LocationNotFoundException e)
            {
                Response.StatusCode = 204;
                return null;
            }
        }
    }
}
