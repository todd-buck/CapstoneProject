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
            int i = 1;
            List<bool> results = new List<bool>();
            PutawayEntryContext.DeleteAll();
            results.Add(await UnitTestsContext.Test1_deleteAllItems());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test2_deleteAllLocations());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test3_uploadCSV());
            Console.WriteLine($"Test {i++} done.");
            return "HALTED EARLY";
            results.Add(await UnitTestsContext.Test4_addItem());
            Console.WriteLine($"Test {i++} done.");
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
