using DDRInventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace DDRInventory.Controllers
{
    [Route("api/tests")]
    [ApiController]
    public class UnitTestsController : ControllerBase
    {
        [HttpGet("run")]
        public string run()
        {
            LocationContext.DeleteAll();
            PutawayEntryContext.DeleteAll();
            UnitTestsContext.step9_getSchema();
            UnitTestsContext.step10_addLocation();
            UnitTestsContext.step11_getLocationName();
            return "PLEASE DO NOT FORGET TO ROLL BACK ANY CATALOG CHANGES IN YOUR GIT STAGING BEFORE COMMITING";
        }
    }
}
