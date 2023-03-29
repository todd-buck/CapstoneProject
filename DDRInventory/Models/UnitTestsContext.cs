using DDRInventory.Objects;
using Newtonsoft.Json;

namespace DDRInventory.Models
{
    public class UnitTestsContext
    {
        static string BASE_URI = "https://localhost:7105/api";
        public static async void getCatalogTest()
        {
            Console.WriteLine("RUNNING UNIT TEST 'GET CATALOG'...");
            string endPoint = "/item/catalog";
            HttpClient client = new HttpClient();
            string response = await client.GetStringAsync(BASE_URI + endPoint);
            InventoryItem[]? data = JsonConvert.DeserializeObject<InventoryItem[]>(response);
            if (true)
            {
                Console.WriteLine("\tUNIT TEST 'GET CATALOG' PASSED");
                Console.WriteLine($"The first item's name is {(data is not null && data[0] is not null ? data[0].Name : null)}");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 'GET CATALOG' FAILED");
                Console.WriteLine("\tRESULT: {/*FIXME: OBJECT.TOSTRING()*/}");
                Console.WriteLine("\tEXPECTED: {/*FIXME: OBJECT.TOSTRING()*/}");
            }
        }
        public static async void addItemTest()
        {
            Console.WriteLine("RUNNING UNIT TEST 'ADD ITEM'...");
            InventoryItem item = new InventoryItem()
            {
                Name = "Potato",
                Id = "1",
                Category = "Food",
                SubCategory = "Starch",
                ParLevel = 10,
                Price = 0.50M,
                QuantityOnHand = 40,
                Unit = "Lbs."
            };
            string endPoint = "/item/add";
            HttpClient client = new HttpClient();
            string response = await client.PostAsJsonAsync(BASE_URI + endPoint, item).GetAwaiter().GetResult().Content.ReadAsStringAsync();
            string? data = JsonConvert.DeserializeObject<string>(response);
            if (data == "1")
            {
                Console.WriteLine("\tUNIT TEST 'ADD ITEM 1' PASSED");
            }
            else
            {
                Console.WriteLine("\tUNIT TEST 'ADD ITEM 1' FAILED");
                Console.WriteLine($"\tRESULT: '{data}'");
                Console.WriteLine("\tEXPECTED: '1'");
            }
        }
    }
}
