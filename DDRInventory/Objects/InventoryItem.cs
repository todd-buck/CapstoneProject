namespace DDRInventory.Objects
{
    public class InventoryItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int QuantityOnHand { get; set; }
        public decimal Price { get; set; }
        public string Unit { get; set; }

        public override string ToString()
        {
            return "'" + Id.ToString() + "', '" + Name.ToString() + "', '" + QuantityOnHand.ToString() + "', '" + Price.ToString() + "', '" + Unit.ToString() + "'";
        }
    }
}