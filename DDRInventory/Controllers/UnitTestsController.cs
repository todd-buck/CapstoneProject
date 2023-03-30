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
            results.Add(await UnitTestsContext.step9_getSchema());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step10_addLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step11_getLocationName());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step12_addLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step13_deleteLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step14_deleteAllLocations());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step15_addLocation());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step16_addPutawayEntry());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.step17_updatePutawayEntry());
            Console.WriteLine($"Test {i++} done.");
            results.TrueForAll(item => item);
            return "PLEASE DO NOT FORGET TO ROLL BACK ANY CATALOG CHANGES IN YOUR GIT STAGING BEFORE COMMITING";
        }
    }
}
