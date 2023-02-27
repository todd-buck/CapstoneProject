using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Mvc;

namespace DDRInventory.Controllers
{
    [ApiController]
    [Route("database")]
    public class InventoryItemController : ControllerBase
    {

        [HttpPost("/api/add")]
        public int Add(string name, int quantity, Decimal price, string unit, string category, string subCategory, int parLevel)
        {
            int id = InventoryItem.GenerateId();
            InventoryItemContext.AddItem(new InventoryItem
            {
                Id = id,
                Name = name,
                Price = price,
                Unit = unit,
                QuantityOnHand = quantity,
                Category = category,
                SubCategory = subCategory,
                ParLevel = parLevel
            });
            return id;
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

        [HttpDelete("/api/delete")]
        public bool deleteItem(int id)
        {
            //should eventually return specific code if success if failure and if item not exist
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
//451: Item not found - Used when deleting an item that does not exist or querying the catalog for an item with an Id that does not exist
//512: General unspecified SQL error