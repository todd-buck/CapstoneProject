using CsvHelper;
using CsvHelper.Configuration;
using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Reflection;

namespace DDRInventory.Controllers
{
    [ApiController]
    [Route("database")]
    public class InventoryItemController : ControllerBase
    {
        [HttpPost("/api/uploadCSV")]
        public bool UploadCSV(IFormFile file)
        {
            Console.WriteLine($"{file.FileName} uploaded successfully");
            List<InventoryItem> items = new List<InventoryItem>();
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                PrepareHeaderForMatch = args => args.Header.ToLower(),
            };
            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    try
                    {
                        items.Add
                        (
                            new InventoryItem
                            {
                                Name = csv.GetField(csv.GetFieldIndex("name")),
                                QuantityOnHand = csv.GetField<int>(csv.GetFieldIndex("quantity on hand")),
                                Price = Decimal.Parse(csv.GetField<string>(csv.GetFieldIndex("price")).Replace("$", "")),
                                Unit = csv.GetField(csv.GetFieldIndex("unit")),
                                Category = csv.GetField(csv.GetFieldIndex("category")),
                                SubCategory = csv.GetField(csv.GetFieldIndex("subcategory")),
                                ParLevel = csv.GetField<int>(csv.GetFieldIndex("par level")),
                                Id = csv.GetField<int>(csv.GetFieldIndex("id"))
                            }
                        );
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine($"Error when proccessing CSV file. Exception: {e.Message}");
                        Response.StatusCode = 400;
                        return false;
                    }
                }
                InventoryItemContext.AddItems(items);
            }
            return true;
        }

        [HttpPost("/api/add")]
        public int Add(string name, int quantity, Decimal price, string unit, string category, string subCategory, int parLevel, int? id = null)
        {
            if (id is null)
            {
                id = InventoryItem.GenerateId();
            }
            InventoryItemContext.AddItem(new InventoryItem
            {
                Id = id.Value,
                Name = name,
                Price = price,
                Unit = unit,
                QuantityOnHand = quantity,
                Category = category,
                SubCategory = subCategory,
                ParLevel = parLevel
            });
            return id.Value;
        }

        [HttpPatch("/api/update")]
        public bool update(InventoryItem updatedItem)
        {
            if (!InventoryItemContext.UpdateItem(updatedItem))
            {
                Response.StatusCode = 512;
                return false;
            }
            return true;
        }


        [HttpGet("/api/catalog")]
        public InventoryItem[] getCatalog()
        {
            InventoryItem[] returnValue = InventoryItemContext.getAllItems().ToArray();
            if (returnValue.Length == 0) Response.StatusCode = 104;
            return returnValue;
        }

        [HttpGet("/api/item/{id}")]
        public InventoryItem getById(int id)
        {
            InventoryItem returnValue = new InventoryItem();
            try
            {
                returnValue = InventoryItemContext.getItem(id);
            }
            catch (ItemNotFoundException e)
            {
                Response.StatusCode = 451;
            }
            return returnValue;
        }

        [HttpDelete("/api/delete")]
        public bool deleteItem(int id)
        {
            bool returnVal = false;
            try
            {
                returnVal = InventoryItemContext.DeleteItem(id);
            }
            catch (ItemNotFoundException e)
            {
                Response.StatusCode = 451;
                return returnVal;
            }
            return returnVal;
        }

        [HttpDelete("/api/deleteMany")]
        public void deleteMany(int[] ids)
        {
            return;
        }

        [HttpDelete("/api/deleteAll")]
        public void deleteAll()
        {
            InventoryItemContext.DeleteAll();
        }
    }
}

// REPONSE DEFINITIONS:
//1xx: Informational – Communicates transfer protocol-level information.
//2xx: Success – Indicates that the client’s request was accepted successfully.
//3xx: Redirection – Indicates that the client must take some additional action in order to complete their request.
//4xx: Client Error – This category of error status codes points the finger at clients. uSE (451 - 498)
//5xx: Server Error – The server takes responsibility for these error status codes.

//For unused status codes, please reference the following link: https://restfulapi.net/http-status-codes/ 
//104: Database empty - used when an API call to catalog returns an empty list.
//400: Bad Request
//451: Item not found - Used when deleting an item that does not exist or querying the catalog for an item with an Id that does not exist
//512: General unspecified SQL error