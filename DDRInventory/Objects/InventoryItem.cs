using DDRInventory.Controllers;
using DDRInventory.Models;
using System.Security.Cryptography.Xml;

namespace DDRInventory.Objects
{
    public class InventoryItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int QuantityOnHand { get; set; }
        public decimal Price { get; set; }
        public string Unit { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public int ParLevel { get; set; }

        public static string GenerateId()
        {
            Random random = new Random();
            string generatedId = "";
            int i;
            for (i = 0; i < 10; i++)
            {
                generatedId += random.Next(0, 9).ToString();
            }
            while (true)
            {
                try
                {
                    InventoryItem idInUse = InventoryItemContext.GetItem(generatedId);
                    Console.WriteLine($"Generated Id {generatedId} is in use by {idInUse.Name}. Generating new Id");
                    generatedId = (int.Parse(generatedId) + 1).ToString();
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
        public string Id { get; }
        public ItemNotFoundException(string message, string id) : base(message)
        {
            Id = id;
        }
    }
}