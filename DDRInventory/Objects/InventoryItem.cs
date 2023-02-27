using DDRInventory.Controllers;
using DDRInventory.Models;
using System.Security.Cryptography.Xml;

namespace DDRInventory.Objects
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int QuantityOnHand { get; set; }
        public decimal Price { get; set; }
        public string Unit { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public int ParLevel { get; set; }

        public override string ToString()
        {
            return "'" + Id.ToString() + "', '" + Name.ToString() + "', '" + QuantityOnHand.ToString() + "', '" + Price.ToString() + "', '" + Unit.ToString() + "'";
        }
        public static int GenerateId()
        {
            int generatedId = new Random(Guid.NewGuid().GetHashCode()).Next();
            while (true)
            {
                try
                {
                    InventoryItem idInUse = InventoryItemContext.getItem(generatedId);
                    Console.WriteLine($"Generated Id {generatedId} is in use by {idInUse.Name}. Generating new Id");
                    generatedId++;
                    continue;
                }
                catch (ItemNotFoundException e)
                {
                    Console.WriteLine($"Generated Id {e.Id} not in use. New item will use {e.Id}");
                    return e.Id;
                }
            }
        }
    }

    public class ItemNotFoundException : Exception
    {
        public int Id { get; }
        public ItemNotFoundException(int id)
        {
            Id = id;
        }
    }
}