using DDRInventory.Models;
using DDRInventory.Objects;
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
        public int Add(int id, string name, int quantity, Decimal price, string unit)
        {
            //id should never be given by the user. I need a way to keep up with the next id to use...
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
            return InventoryItemContext.getAllItems().ToArray();
        }

        [HttpGet("/api/delete")]
        public bool deleteItem(long id)
        {
            //should eventualyl return specific code if success if failure and if item not exist
            return InventoryItemContext.DeleteItem(id);
        }

        [HttpGet("/api/item/{id}")]
        public InventoryItem getById(long id)
        {
            return InventoryItemContext.getItem(id);
        }
    }
}