﻿using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System;
using Console = Colorful.Console;

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
            List<UnitTestResult> results = new List<UnitTestResult>();
            results.Add(await UnitTestsContext.Test1_deleteAllItems());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test2_deleteAllLocations());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test3_uploadCSV());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test4_addItem());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test5_getItem());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test6_updateItem());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test7_getItem());
            Console.WriteLine($"Test {i++} done.");
            results.Add(await UnitTestsContext.Test8_deleteItem());
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
            foreach (var result in results)
            {
                if (result.Passed)
                    Console.WriteLine(result, Color.Green);
                else
                    Console.WriteLine(result, Color.Red);
            }
            if (results.TrueForAll(result => result.Passed))
                Console.WriteLine("ALL TESTS PASSED");
            return "PLEASE DO NOT FORGET TO ROLL BACK ANY CATALOG CHANGES IN YOUR GIT STAGING BEFORE COMMITING";
        }
    }
}
