using DDRInventory.Models;
using DDRInventory.Objects;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

//IMPLIMENTED
// +CREATE ITEM
// +READ ITEM
// +READ ALL ITEMS
// +UPDATE ITEM
// +DELETE ITEM

namespace DDRInventory.Controllers
{
    [ApiController]
    [Route("database")]
    public class InventoryItemController : ControllerBase
    {

        [HttpPost("/api/add")]
        public int Add(string name, int quantity, Decimal price, string unit)
        {
            int id = InventoryItem.GenerateId();
            InventoryItemContext.AddItem(new InventoryItem
            {
                Id = id,
                Name = name,
                Price = price,
                Unit = unit,
                QuantityOnHand = quantity
            });
            return id;
        }

        [HttpPost("/api/update")]
        public bool update(int id, string field, string value)
        {
            return InventoryItemContext.UpdateItem(id, field, value);
        }

        [HttpGet("/api/catalog")]
        public InventoryItem[] getCatalog()
        {
            InventoryItem[] returnValue = InventoryItemContext.getAllItems().ToArray();
            if (returnValue.Length == 0) return new InventoryItem[]{
                new InventoryItem()
                {
                    Id = -1,
                }
            };
            return returnValue;
        }

        [HttpGet("/api/delete")]
        public bool deleteItem(int id)
        {
            //should eventually return specific code if success if failure and if item not exist
            return InventoryItemContext.DeleteItem(id);
        }

        [HttpGet("/api/item/{id}")]
        public InventoryItem getById(int id)
        {
            return InventoryItemContext.getItem(id);
        }
    }
}