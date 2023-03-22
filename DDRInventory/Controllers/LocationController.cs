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
        Location[] getCatalog()
        {
            try
            {
                Location[] returnValue = LocationContext.GetAllLocations().ToArray();
                if (returnValue.Length == 0) Response.StatusCode= 204;
                return returnValue;
            }
            catch (SQLiteException e) 
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode= 512;
                return new Location[0];
            }
        }

        [HttpPost("/api/location/add")]
        int add(Location newLocation)
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
    }
}
