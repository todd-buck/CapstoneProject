namespace DDRInventory.Objects
{
    public class PutawayEntry
    {
            public string ItemId { get; set; }
            public int LocationId { get; set; }
            public string LocationName { get; set; }
            public int QuantityInLocation { get; set; }
    }
    public class PutawayEntryNotFoundException : Exception
    {
        public string ItemId { get; }
        public int LocationId { get; }
        public PutawayEntryNotFoundException(string message, string itemId, int locationId) : base(message)
        {
            ItemId = itemId;
            LocationId = locationId;
        }
    }
}
