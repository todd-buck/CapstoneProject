using DDRInventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace DDRInventory.Controllers
{
    [Route("api/tests")]
    [ApiController]
    public class UnitTestsController : ControllerBase
    {
        [HttpGet("run")]
        public async Task<string> run()
        {
            int i = 9;
            List<bool> results = new List<bool>();
            LocationContext.DeleteAll();
            PutawayEntryContext.DeleteAll();
            results.Add(await UnitTestsContext.Test9_getSchema());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test10_addLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test11_getLocationName());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test12_addLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test13_deleteLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test14_deleteAllLocations());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test15_addLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test16_addPutawayEntry());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test17_updatePutawayEntry());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test18_getEntriesByLocation());
            Console.WriteLine($"Test {i++} done.");
            if (results.TrueForAll(item => item))
                Console.WriteLine("ALL TESTS PASSED");
            return "PLEASE DO NOT FORGET TO ROLL BACK ANY CATALOG CHANGES IN YOUR GIT STAGING BEFORE COMMITING";
        }
    }
}
