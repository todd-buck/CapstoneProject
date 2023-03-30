using DDRInventory.Objects;
using Newtonsoft.Json;
using System.Xml.Linq;

namespace DDRInventory.Models
{
    public class UnitTestsContext
    {
        static string BASE_URI = "https://localhost:7105/api";

        public static async Task<bool> Test9_getSchema()
        {
            string[] control = { "Id", "Name", "QuantityOnHand", "Price", "Unit", "Category", "SubCategory", "ParLevel" };

            Console.WriteLine("RUNNING UNIT TEST 9 'GET SCHEMA'...");
            string endPoint = "/item/schema";
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(BASE_URI + endPoint);
            string[]? data = JsonConvert.DeserializeObject<string[]>(response);
            if (string.Join(", ", data) == string.Join(", ", control))
            {
                Console.WriteLine("\tUNIT TEST 9 'GET SCHEMA' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 9 'GET SCHEMA' FAILED");
                Console.WriteLine($"\tUNIT TEST 9: RESULT: {"\"" + string.Join(", ", data) + "\""}");
                Console.WriteLine($"\tUNIT TEST 9: EXPECTED: {"\"" + string.Join(", ", control) + "\""}");
                return false;
            }
        }

        public static async Task<bool> Test10_addLocation()
        {
            Console.WriteLine("RUNNING UNIT TEST 10.1 'ADD LOCATION'...");
            string name = "Freezer";
            string endPoint = $"/location/add/{name}";
            HttpClient client = new HttpClient();
            string response = await client.PostAsJsonAsync(BASE_URI + endPoint, new object()).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            bool data = JsonConvert.DeserializeObject<bool>(response);
            if (data)
            {
                Console.WriteLine("\tUNIT TEST 10.1 'ADD ITEM LOCATION' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 10.1 'ADD LOCATION' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: '1'");
                return false;
            }
            Console.WriteLine("RUNNING UNIT TEST 10.2 'LOCATION CATALOG'...");
            endPoint = "/location/catalog";
            response = await client.GetStringAsync(BASE_URI + endPoint);
            Location[]? data2 = JsonConvert.DeserializeObject<Location[]>(response);
            if (data2 is not null && data2.Length == 1)
            {
                Console.WriteLine("\tUNIT TEST 10.2 'LOCATION CATALOG' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 10.2 'LOCATION CATALOG' FAILED");
                if (data2 is null)
                {
                    Console.WriteLine("\tRESULT: A null array");
                }
                else if (data2.Length == 0)
                {
                    Console.WriteLine($"\tRESULT: An array of Location object of length 0");
                }
                else
                {
                    Console.WriteLine("\tRESULT: A non-one-length array of Location objects.");
                }
                Console.WriteLine("\tEXPECTED: An array of Location objects of length 1.");
                return false;
            }
        }
        public static async Task<bool> Test11_getLocationName()
        {
            Console.WriteLine("RUNNING UNIT TEST 11 'GET LOCATION NAME'...");
            string endPoint = "/location/getName/1";
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(BASE_URI + endPoint);
            string data = response;
            if (data == "Freezer")
            {
                Console.WriteLine("\tUNIT TEST 11 'GET LOCATION NAME' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 11 'GET LOCATION NAME' FAILED");
                Console.WriteLine($"\tRESULT: {data}");
                Console.WriteLine("\tEXPECTED: 'Freezer'");
                return false;
            }
        }
        public static async Task<bool> Test12_addLocation()
        {
            Console.WriteLine("RUNNING UNIT TEST 12 'ADD LOCATION'...");
            string name = "Shelf";
            string endPoint = $"/location/add/{name}";
            HttpClient client = new HttpClient();
            string response = await client.PostAsJsonAsync(BASE_URI + endPoint, new object()).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            bool data = JsonConvert.DeserializeObject<bool>(response);
            if (data)
            {
                Console.WriteLine("\tUNIT TEST 12 'ADD LOCATION' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 12 'ADD LOCATION' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: '2'");
                return false;
            }
        }
        public static async Task<bool> Test13_deleteLocation()
        {
            Console.WriteLine("RUNNING UNIT TEST 13.1 'DELETE LOCATION'...");
            string endPoint = "/location/delete/2";
            HttpClient client = new HttpClient();
            string response = await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
            bool? data = JsonConvert.DeserializeObject<bool>(response);
            if (data is not null && data.GetValueOrDefault(false))
            {
                Console.WriteLine("\tUNIT TEST 13.1 'DELETE LOCATION' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 13.1 'DELETE LOCATION' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: 'true'");
                return false;
            }
            Console.WriteLine("RUNNING UNIT TEST 13.2 'LOCATION CATALOG'...");
            endPoint = "/location/catalog";
            response = await client.GetStringAsync(BASE_URI + endPoint);
            Location[]? data2 = JsonConvert.DeserializeObject<Location[]>(response);
            if (data2 is not null && data2.Length == 1)
            {
                Console.WriteLine("\tUNIT TEST 13.2 'LOCATION CATALOG' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 13.2 'LOCATION CATALOG' FAILED");
                if (data2 is null)
                {
                    Console.WriteLine("\tRESULT: A null array");
                }
                else if (data2.Length == 0)
                {
                    Console.WriteLine($"\tRESULT: An array of Location object of length 0");
                }
                else
                {
                    Console.WriteLine("\tRESULT: A non-one-length array of Location objects.");
                }
                Console.WriteLine("\tEXPECTED: An array of Location objects of length 1.");
                return false;
            }
        }
        public static async Task<bool> Test14_deleteAllLocations()
        {
            Console.WriteLine("RUNNING UNIT TEST 14.1 'DELETE ALL LOCATIONS'...");
            string endPoint = "/location/delete/all";
            HttpClient client = new HttpClient();
            string response = await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
            bool data = JsonConvert.DeserializeObject<bool>(response);
            if (data)
            {
                Console.WriteLine("\tUNIT TEST 14.1 'DELETE ALL LOCATIONS' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 14.1 'DELETE ALL LOCATIONS' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: 'true'");
                return false;
            }
            Console.WriteLine("RUNNING UNIT TEST 14.2 'LOCATION CATALOG'...");
            endPoint = "/location/catalog";
            response = await client.GetStringAsync(BASE_URI + endPoint);
            Location[]? data2 = JsonConvert.DeserializeObject<Location[]>(response);
            if (data2 is not null && data2.Length == 0)
            {
                Console.WriteLine("\tUNIT TEST 14.2 'LOCATION CATALOG' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 14.2 'LOCATION CATALOG' FAILED");
                if (data2 is null)
                {
                    Console.WriteLine("\tRESULT: A null array");
                }
                else if (data2.Length == 0)
                {
                    Console.WriteLine($"\tRESULT: An array of Location object of length 0");
                }
                else
                {
                    Console.WriteLine("\tRESULT: A non-one-length array of Location objects.");
                }
                Console.WriteLine("\tEXPECTED: An array of Location objects of length 1.");
                return false;
            }
        }
        public static async Task<bool> Test15_addLocation()
        {
            Console.WriteLine("RUNNING UNIT TEST 15 'ADD LOCATION'...");
            string name = "Freezer";
            string endPoint = $"/location/add/{name}";
            HttpClient client = new HttpClient();
            string response = await client.PostAsJsonAsync(BASE_URI + endPoint, new object()).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            bool data = JsonConvert.DeserializeObject<bool>(response);
            if (data)
            {
                Console.WriteLine("\tUNIT TEST 15 'ADD ITEM LOCATION' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 15 'ADD LOCATION' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: '1'");
                return false;
            }
        }
        public static async Task<bool> Test16_addPutawayEntry()
        {
            Console.WriteLine("RUNNING UNIT TEST 16.1 'ADD PUTAWAY ENTRY'...");

            PutawayEntry entry = new PutawayEntry()
            {
                ItemId = "5",
                LocationId = 1,
                LocationName = "Freezer",
                QuantityInLocation = 10
            };
            string endPoint = "/putaway/add";
            HttpClient client = new HttpClient();
            string response = await client.PostAsJsonAsync(BASE_URI + endPoint, entry).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            bool data = JsonConvert.DeserializeObject<bool>(response);
            if (data)
            {
                Console.WriteLine("\tUNIT TEST 16.1 'ADD PUTAWAY ENTRY' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 16.1 'ADD PUTAWAY ENTRY' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: 'true'");
                return false;
            }
            Console.WriteLine("RUNNING UNIT TEST 16.2 'PUTAWAY ENTRIES BY ITEM'...");
            endPoint = "/putaway/item/5";
            response = await client.GetStringAsync(BASE_URI + endPoint);
            PutawayEntry[]? data2 = JsonConvert.DeserializeObject<PutawayEntry[]>(response);
            if (data2 is not null && data2.Length == 1)
            {
                if (data2[0].ItemId == entry.ItemId && data2[0].LocationId == entry.LocationId && data2[0].LocationName == entry.LocationName && data2[0].QuantityInLocation == entry.QuantityInLocation)
                {
                    Console.WriteLine("\tUNIT TEST 16.2 'PUTAWAY ENTRIES BY ITEM ID' PASSED");
                    return true;
                }
                return false;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 16.2 'PUTAWAY ENTRIES BY ITEM ID' FAILED");
                if (data2 is null)
                {
                    Console.WriteLine("\tRESULT: A null array");
                }
                else if (data2.Length == 0)
                {
                    Console.WriteLine($"\tRESULT: An array of PutawayEntry object of length 0");
                }
                else
                {
                    Console.WriteLine($"\tRESULT SET [0]: Item Id:{data2[0].ItemId}, Location Id:{data2[0].LocationId}, Location Name:{data2[0].LocationName}, Quantity:{data2[0].QuantityInLocation}");
                }
                Console.WriteLine("\tEXPECTED: An array of PutawayEntry objects of length 1. Item zero must be");
                Console.WriteLine($"Item Id:{entry.ItemId}, Location Id:{entry.LocationId}, Location Name:{entry.LocationName}, Quantity: {entry.QuantityInLocation}");
                return false;
            }
        }
        public static async Task<bool> Test17_updatePutawayEntry()
        {
            Console.WriteLine("RUNNING UNIT TEST 17 'UPDATE PUTAWAY ENTRY'...");

            PutawayEntry entry = new PutawayEntry()
            {
                ItemId = "5",
                LocationId = 1,
                LocationName = "Freezer",
                QuantityInLocation = 20
            };
            string endPoint = "/putaway/update";
            HttpClient client = new HttpClient();
            string response = await client.PutAsJsonAsync(BASE_URI + endPoint, entry).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            bool data = JsonConvert.DeserializeObject<bool>(response);
            if (data)
            {
                Console.WriteLine("\tUNIT TEST 17 'UPDATE PUTAWAY ENTRY' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 17 'UPDATE PUTAWAY ENTRY' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine($"\tEXPECTED: 'true'");
                return false;
            }
        }
        public static async Task<bool> Test18_getEntriesByLocation()
        {
            string endPoint = "/putaway/location/1";
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(BASE_URI + endPoint);
            PutawayEntry[]? data = JsonConvert.DeserializeObject<PutawayEntry[]?>(response);
            if (data is not null && data.Length == 1 && data[0].LocationName == "Freezer" && data[0].ItemId == "5")
            {
                Console.WriteLine("\tUNIT TEST 18 'PUTAWAY ENTRIES BY LOCATION' PASSED");
                return true;
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 18 'PUTAWAY ENTRIES BY LOCATION FAILED");
                Console.WriteLine($"\tRESULT: '{response}'");
                Console.WriteLine($"\tEXPECTED: 'true'");
                return false;
            }
        }
    }
}
