using DDRInventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace DDRInventory.Controllers
{
    [Route("api/tests")]
    [ApiController]
    public class UnitTestsController : ControllerBase
    {
        [HttpGet("run")]
        public bool run()
        {
            UnitTestsContext.getCatalogTest();
            UnitTestsContext.addItemTest();
            return true;
        }
    }
}
