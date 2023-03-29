using DDRInventory.Objects;
using Newtonsoft.Json;

namespace DDRInventory.Models
{
    public class UnitTestsContext
    {
        static string BASE_URI = "https://localhost:7105/api";

        public static async void step9_getSchema()
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
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 9 'GET SCHEMA' FAILED");
                Console.WriteLine($"\tRESULT: {"\"" + string.Join(", ", data) + "\""}");
                Console.WriteLine($"\tEXPECTED: {"\"" + string.Join(", ", control) + "\""}");
            }
        }

        public static async void step10_addLocation()
        {
            Console.WriteLine("RUNNING UNIT TEST 10.1 'ADD LOCATION'...");
            Location location = new Location()
            {
                Name = "Freezer",
                Id = 1
            };
            string endPoint = "/location/add";
            HttpClient client = new HttpClient();
            string response = await client.PostAsJsonAsync(BASE_URI + endPoint, location).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            bool? data = JsonConvert.DeserializeObject<bool>(response);
            if (data ?? false)
            {
                Console.WriteLine("\tUNIT TEST 10.1 'ADD ITEM LOCATION' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 10.1 'ADD LOCATION' FAILED");
                Console.WriteLine($"\tRESULT: 'false'");
                Console.WriteLine("\tEXPECTED: 'true'");
            }
            Console.WriteLine("RUNNING UNIT TEST 10.2 'LOCATION CATALOG'...");
            endPoint = "/location/catalog";
            response = await client.GetStringAsync(BASE_URI + endPoint);
            Location[]? data2 = JsonConvert.DeserializeObject<Location[]>(response);
            if (data2 is not null && data2.Length == 1)
            {
                Console.WriteLine("\tUNIT TEST 10.2 'LOCATION CATALOG' PASSED");
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
            }
        }
        public static async void step11_getLocationName()
        {
            Console.WriteLine("RUNNING UNIT TEST 11 'GET LOCATION NAME'...");
            string endPoint = "/location/getName/1";
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(BASE_URI + endPoint);
            string data = response;
            if (data == "Freezer")
            {
                Console.WriteLine("\tUNIT TEST 11 'GET LOCATION NAME' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 11 'GET LOCATION NAME' FAILED");
                Console.WriteLine($"\tRESULT: {data}");
                Console.WriteLine("\tEXPECTED: 'Freezer'");
            }
        }
    }
}
