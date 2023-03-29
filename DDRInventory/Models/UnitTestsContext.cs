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
                Console.WriteLine("\tUNIT TEST 'GET SCHEMA' FAILED");
                Console.WriteLine($"\tRESULT: {"\"" + string.Join(", ", data) + "\""}");
                Console.WriteLine($"\tEXPECTED: {"\"" + string.Join(", ", control) + "\""}");
            }
        }
    }
}
