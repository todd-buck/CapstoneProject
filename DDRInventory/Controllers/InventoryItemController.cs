using CsvHelper;
using CsvHelper.Configuration;
using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.Globalization;

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
                        items.Add(new InventoryItem
                        {
                            Name = csv.GetField(csv.GetFieldIndex("name")),
                            QuantityOnHand = csv.GetField<int>(csv.GetFieldIndex("quantity on hand")),
                            Price = Decimal.Parse(csv.GetField(csv.GetFieldIndex("price")).Replace("$", "")),
                            Unit = csv.GetField(csv.GetFieldIndex("unit")),
                            Category = csv.GetField(csv.GetFieldIndex("category")),
                            SubCategory = csv.GetField(csv.GetFieldIndex("subcategory")),
                            ParLevel = csv.GetField<int>(csv.GetFieldIndex("par level")),
                            Id = csv.GetField<int>(csv.GetFieldIndex("id"))
                        });
                        InventoryItemContext.AddItems(items);
                    }
                    catch (SQLiteException e)
                    {
                        Console.WriteLine($"SQL Error. Exception: {e.Message}");
                        Response.StatusCode = 512;
                        return false;
                    }
                    catch(CsvHelperException e)
                    {
                        Console.WriteLine($"Error when proccessing CSV file. Exception: {e.Message}");
                        Response.StatusCode = 400;
                        return false;
                    }
                }
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
            try
            {
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
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return id.Value;
            }
            return id.Value;
        }

        [HttpPut("/api/update")]
        public bool update(InventoryItem updatedItem)
        {
            try
            {
                return InventoryItemContext.UpdateItem(updatedItem);
            }
            catch(SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
        }


        [HttpGet("/api/catalog")]
        public InventoryItem[] getCatalog()
        {
            try
            {
                InventoryItem[] returnValue = InventoryItemContext.getAllItems().ToArray();
                if (returnValue.Length == 0) Response.StatusCode = 204;
                return returnValue;
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new InventoryItem[0];
            }
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
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return new InventoryItem();
            }
            return returnValue;
        }

        [HttpDelete("/api/delete")]
        public bool deleteItem(int id)
        {
            bool returnVal;
            try
            {
                returnVal = InventoryItemContext.DeleteItem(id);
            }
            catch (ItemNotFoundException e)
            {
                Response.StatusCode = 451;
                return false;
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
                return false;
            }
            return returnVal;
        }

        [HttpDelete("/api/deleteMany")]
        public void deleteMany(int[] ids)
        {
            Response.StatusCode = 501;
            return;
        }

        [HttpDelete("/api/deleteAll")]
        public void deleteAll()
        {
            try
            {
                InventoryItemContext.DeleteAll();
            }
            catch (SQLiteException e)
            {
                Console.WriteLine($"SQL Error. Exception: {e.Message}");
                Response.StatusCode = 512;
            }
        }
    }
}

// REPONSE DEFINITIONS:
//1xx: Informational � Communicates transfer protocol-level information.
//2xx: Success � Indicates that the client�s request was accepted successfully.
//3xx: Redirection � Indicates that the client must take some additional action in order to complete their request.
//4xx: Client Error � This category of error status codes points the finger at clients. uSE (451 - 498)
//5xx: Server Error � The server takes responsibility for these error status codes.

//For unused status codes, please reference the following link: https://restfulapi.net/http-status-codes/ 
//204 : No content- used when the catalog is empty
//400: Bad Request
//451: Item not found - Used when deleting an item that does not exist or querying the catalog for an item with an Id that does not exist
//512: General unspecified SQL error