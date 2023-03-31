using DDRInventory.Objects;
using Microsoft.AspNetCore.Connections.Features;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Reflection;
using System.Xml.Linq;

namespace DDRInventory.Models
{
    public class UnitTestsContext
    {
        static string BASE_URI = "https://localhost:7105/api";

        public async static Task<InventoryItem[]> GetItemCatalog()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/item/catalog";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                return JsonConvert.DeserializeObject<InventoryItem[]>(response);
            }
        }

        public async static Task<Location[]> GetLocationCatalog()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/location/catalog";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                return JsonConvert.DeserializeObject<Location[]>(response);
            }
        }

        public static async Task<UnitTestResult> Test1_deleteAllItems()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/item/delete/all";
                await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                InventoryItem[] data = GetItemCatalog().GetAwaiter().GetResult();
                if (data is not null && data.Length == 0)
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "DELETE ALL ITEMS",
                        TestNumber = 1
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "DELETE ALL ITEMS",
                        TestNumber = 1,
                        ExpectedValue = "An empty array of InventoryItem",
                        ActualValue = string.Join(',', data.Select(item => item.ToString()))
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test2_deleteAllLocations()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/location/delete/all";
                await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                InventoryItem[] data = GetItemCatalog().GetAwaiter().GetResult();
                if (data is not null && data.Length == 0)
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "DELETE ALL LOCATIONS",
                        TestNumber = 2
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "DELETE ALL LOCATIONS",
                        TestNumber = 2,
                        ExpectedValue = "An empty array of Location",
                        ActualValue = string.Join(',', data.Select(item => item.ToString()))
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test3_uploadCSV()
        {
            string endPoint = "/item/uploadCSV";
            using (HttpClient client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    using (ByteArrayContent fileContent = new ByteArrayContent(File.ReadAllBytes(Directory.GetCurrentDirectory() + '\\' + "/Testing/TestItems.csv")))
                    {
                        fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse("multipart/form-data");
                        form.Add(fileContent, "file", "file.csv");
                        await client.PostAsync(BASE_URI + endPoint, form);

                        InventoryItem[] data = GetItemCatalog().GetAwaiter().GetResult();
                        if (data is not null && data.Length == 10)
                        {
                            return new UnitTestResult()
                            {
                                Passed = true,
                                TestName = "UPLOAD CSV",
                                TestNumber = 3
                            };
                        }
                        else
                        {
                            return new UnitTestResult()
                            {
                                Passed = false,
                                TestName = "UPLOAD CSV",
                                TestNumber = 3,
                                ExpectedValue = "An array of InventoryItem of length 10",
                                ActualValue = string.Join(',', data.Select(item => item.ToString()))
                            };
                        }
                    }
                }
            }
        }

        public static async Task<UnitTestResult> Test4_addItem()
        {
            using (HttpClient client = new HttpClient())
            {
                InventoryItem item = new InventoryItem()
                {
                    Name = "Michelob Ultra",
                    QuantityOnHand = 20,
                    Price = 300,
                    Unit = "bottles",
                    Category = "BEER",
                    SubCategory = "DOMESTIC",
                    ParLevel = 10,
                    Id = "20"
                };
                string endPoint = "/item/add";
                await client.PostAsJsonAsync(BASE_URI + endPoint, item).Result.Content.ReadAsStringAsync();
                InventoryItem[] data = GetItemCatalog().GetAwaiter().GetResult();
                if (data.Contains(item))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "ADD ITEM",
                        TestNumber = 4
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "ADD ITEM",
                        TestNumber = 4,
                        ExpectedValue = $"An array of InventoryItem containing {item.ToString()}",
                        ActualValue = string.Join('\n', data.Select(item => item.ToString()))
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test5_getItem()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/item/20";
                string response = await client.GetAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                InventoryItem data = JsonConvert.DeserializeObject<InventoryItem>(response);
                InventoryItem ev = new InventoryItem()
                {
                    Name = "Michelob Ultra",
                    QuantityOnHand = 20,
                    Price = 300,
                    Unit = "bottles",
                    Category = "BEER",
                    SubCategory = "DOMESTIC",
                    ParLevel = 10,
                    Id = "20"
                };
                if (data == ev)
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "GET ITEM",
                        TestNumber = 5
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "GET ITEM",
                        TestNumber = 5,
                        ExpectedValue = new InventoryItem()
                        {
                            Name = "Michelob Ultra",
                            QuantityOnHand = 20,
                            Price = 300,
                            Unit = "bottles",
                            Category = "BEER",
                            SubCategory = "DOMESTIC",
                            ParLevel = 10,
                            Id = "20"
                        }.ToString(),
                        ActualValue = data.ToString()
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test6_updateItem()
        {
            using (HttpClient client = new HttpClient())
            {
                InventoryItem item = new InventoryItem()
                {
                    Name = "Miller Lite",
                    QuantityOnHand = 20,
                    Price = 300,
                    Unit = "bottles",
                    Category = "BEER",
                    SubCategory = "DOMESTIC",
                    ParLevel = 10,
                    Id = "20"
                };
                string endPoint = "/item/update";
                string response = await client.PutAsJsonAsync(BASE_URI + endPoint, item).Result.Content.ReadAsStringAsync();
                bool data = JsonConvert.DeserializeObject<bool>(response);
                if (data)
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "UPDATE ITEM",
                        TestNumber = 6
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "UPDATE ITEM",
                        TestNumber = 6,
                        ExpectedValue = "true",
                        ActualValue = data.ToString()
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test7_getItem()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/item/20";
                string response = await client.GetAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                InventoryItem data = JsonConvert.DeserializeObject<InventoryItem>(response);
                InventoryItem ev = new InventoryItem()
                {
                    Name = "Miller Lite",
                    QuantityOnHand = 20,
                    Price = 300,
                    Unit = "bottles",
                    Category = "BEER",
                    SubCategory = "DOMESTIC",
                    ParLevel = 10,
                    Id = "20"
                };
                if (data == ev)
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "GET ITEM",
                        TestNumber = 7
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "GET ITEM",
                        TestNumber = 7,
                        ExpectedValue = ev.ToString(),
                        ActualValue = data.ToString()
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test8_deleteItem()
        {
            using (HttpClient client = new HttpClient())
            {
                InventoryItem item = new InventoryItem()
                {
                    Name = "Miller Lite",
                    QuantityOnHand = 20,
                    Price = 300,
                    Unit = "bottles",
                    Category = "BEER",
                    SubCategory = "DOMESTIC",
                    ParLevel = 10,
                    Id = "20"
                };
                string endPoint = "/item/delete/20";
                await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                InventoryItem[] data = GetItemCatalog().GetAwaiter().GetResult();
                if (!data.Contains(item))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "DELETE ITEM",
                        TestNumber = 8
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "DELETE ITEM",
                        TestNumber = 8,
                        ExpectedValue = "An array of InventoryItem that does not contain \"Miller Lite\"",
                        ActualValue = string.Join('\n', data.Select(item => item.ToString()))
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test9_getSchema()
        {
            using (HttpClient client = new HttpClient())
            {
                string[] control = { "Id", "Name", "QuantityOnHand", "Price", "Unit", "Category", "SubCategory", "ParLevel" };
                Console.WriteLine("RUNNING UNIT TEST 9 'GET SCHEMA'...");
                string endPoint = "/item/schema";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                string[]? data = JsonConvert.DeserializeObject<string[]>(response);
                if (string.Join(", ", data) == string.Join(", ", control))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "GET ITEM SCHEMA",
                        TestNumber = 9
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "GET ITEM SCHEMA",
                        TestNumber = 9,
                        ExpectedValue = string.Join(", ", control),
                        ActualValue = string.Join(", ", data)
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test10_addLocation()
        {
            using (HttpClient client = new HttpClient())
            {
                string name = "Freezer";
                string endPoint = $"/location/add/{name}";
                await client.PostAsJsonAsync(BASE_URI + endPoint, new object()).GetAwaiter().GetResult().Content.ReadAsStringAsync();
                Location[] data2 = GetLocationCatalog().GetAwaiter().GetResult();
                if (data2.Select(location => location.Name).Contains(name))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "ADD LOCATION",
                        TestNumber = 10
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "ADD LOCATION",
                        TestNumber = 10,
                        ExpectedValue = "An array of locations containing \"Freezer\"",
                        ActualValue = string.Join("\n", data2.Select(location => location.ToString()))
                    };
                }
            }
        }
        public static async Task<UnitTestResult> Test11_getLocationName()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/location/getName/1";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                string data = response;
                if (data == "Freezer")
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "GET LOCATION NAME",
                        TestNumber = 11
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "GET LOCATION NAME",
                        TestNumber = 11,
                        ExpectedValue = "Freezer",
                        ActualValue = data
                    };
                }
            }
        }
        public static async Task<UnitTestResult> Test12_addLocation()
        {
            using (HttpClient client = new HttpClient())
            {
                string name = "Shelf";
                string endPoint = $"/location/add/{name}";
                await client.PostAsJsonAsync(BASE_URI + endPoint, new object()).GetAwaiter().GetResult().Content.ReadAsStringAsync();
                Location[] data = GetLocationCatalog().GetAwaiter().GetResult();
                if (data.Select(location => location.Name).Contains(name))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "ADD LOCATION",
                        TestNumber = 12
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "ADD LOCATION",
                        TestNumber = 12,
                        ExpectedValue = "An array of Locations that contains \"Shelf\"",
                        ActualValue = string.Join('\n', data.Select(location => location.ToString()))
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test13_deleteLocation()
        {
            using (HttpClient client = new HttpClient())
            {
                string name = "Shelf";
                string endPoint = $"/location/delete/2";
                await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                Location[] data = GetLocationCatalog().GetAwaiter().GetResult();
                if (!data.Select(location => location.Name).Contains(name))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "DELETE LOCATION",
                        TestNumber = 13
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "DELETE LOCATION",
                        TestNumber = 13,
                        ExpectedValue = "An array of Locations that does not contain \"Shelf\"",
                        ActualValue = string.Join('\n', data.Select(location => location.ToString()))
                    };
                }
            }
        }

        public static async Task<UnitTestResult> Test14_deleteAllLocations()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/location/delete/all";
                await client.DeleteAsync(BASE_URI + endPoint).Result.Content.ReadAsStringAsync();
                Location[] data = GetLocationCatalog().GetAwaiter().GetResult();
                if (data.Length == 0)
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "DELETE ALL LOCATIONS",
                        TestNumber = 14
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "DELETE ALL LOCATIONS",
                        TestNumber = 14,
                        ExpectedValue = "An array of Locations of Legnth 0",
                        ActualValue = string.Join('\n', data.Select(location => location.ToString()))
                    };
                }
            }
        }
        public static async Task<UnitTestResult> Test15_addLocation()
        {
            using (HttpClient client = new HttpClient())
            {
                string name = "Freezer";
                string endPoint = $"/location/add/{name}";
                await client.PostAsJsonAsync(BASE_URI + endPoint, new object()).GetAwaiter().GetResult().Content.ReadAsStringAsync();
                Location[] data = GetLocationCatalog().GetAwaiter().GetResult();
                if (data.Select(location => location.Name).Contains(name))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "ADD LOCATION",
                        TestNumber = 15
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "ADD LOCATION",
                        TestNumber = 15,
                        ExpectedValue = "An array of Locations that contains \"Freezer\"",
                        ActualValue = string.Join('\n', data.Select(location => location.ToString()))
                    };
                }
            }
        }
        public static async Task<UnitTestResult> Test16_addPutawayEntry()
        {
            using (HttpClient client = new HttpClient())
            {
                PutawayEntry entry = new PutawayEntry()
                {
                    ItemId = "5",
                    LocationId = 1,
                    LocationName = "Freezer",
                    QuantityInLocation = 10
                };
                string endPoint = "/putaway/add";
                await client.PostAsJsonAsync(BASE_URI + endPoint, entry).GetAwaiter().GetResult().Content.ReadAsStringAsync();
                endPoint = "/putaway/item/5";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                PutawayEntry[]? data = JsonConvert.DeserializeObject<PutawayEntry[]>(response);
                if (data.Contains(entry))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "ADD PUTAWAY ENTRY",
                        TestNumber = 16
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "ADD PUTAWAY ENTRY",
                        TestNumber = 16,
                        ExpectedValue = $"An array of PutawayEntries that contains {entry.ToString()}",
                        ActualValue = string.Join('\n', data.Select(e => e.ToString()))
                    };

                }
            }
        }
        public static async Task<UnitTestResult> Test17_updatePutawayEntry()
        {
            using (HttpClient client = new HttpClient())
            {
                PutawayEntry updatedEntry = new PutawayEntry()
                {
                    ItemId = "5",
                    LocationId = 1,
                    LocationName = "Freezer",
                    QuantityInLocation = 20 //quantity was changed to 20
                };
                string endPoint = "/putaway/update";
                await client.PutAsJsonAsync(BASE_URI + endPoint, updatedEntry).GetAwaiter().GetResult().Content.ReadAsStringAsync();
                endPoint = "/putaway/item/5";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                PutawayEntry[]? data = JsonConvert.DeserializeObject<PutawayEntry[]>(response);
                if (data.Contains(updatedEntry))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "UPDATE PUTAWAY ENTRY",
                        TestNumber = 17
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "UPDATE PUTAWAY ENTRY",
                        TestNumber = 17,
                        ExpectedValue = $"An array of PutawayEntries that contains {updatedEntry.ToString()}",
                        ActualValue = string.Join('\n', data.Select(e => e.ToString()))
                    };

                }
            }
        }
        public static async Task<UnitTestResult> Test18_getEntriesByLocation()
        {
            using (HttpClient client = new HttpClient())
            {
                string endPoint = "/putaway/location/1";
                string response = await client.GetStringAsync(BASE_URI + endPoint);
                PutawayEntry[]? data = JsonConvert.DeserializeObject<PutawayEntry[]?>(response);
                if (data.Select(pe => pe.LocationName).Contains("Freezer"))
                {
                    return new UnitTestResult()
                    {
                        Passed = true,
                        TestName = "GET PUTAWAY BY LOCATION",
                        TestNumber = 18
                    };
                }
                else
                {
                    return new UnitTestResult()
                    {
                        Passed = false,
                        TestName = "GET PUTAWAY BY LOCATION",
                        TestNumber = 18,
                        ExpectedValue = $"An array of PutawayEntries with 1 item that is in location \"Freeezer\"",
                        ActualValue = string.Join('\n', data.Select(e => e.ToString()))
                    };
                }
            }
        }
    }
}
