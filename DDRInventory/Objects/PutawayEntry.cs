using System.Xml.Linq;

namespace DDRInventory.Objects
{
    public class PutawayEntry
    {
            public string ItemId { get; set; }
            public int LocationId { get; set; }
            public string ItemName { get; set; }
            public string LocationName { get; set; }
            public int QuantityInLocation { get; set; }
        public override string ToString()
        {
            if (this is null) return "Null PutawayEntry";
            return $"Putaway Entry {{ Location: {LocationId}, Item: {ItemId}, Quantity: {QuantityInLocation} }}";
        }
        public static bool operator ==(PutawayEntry lhs, PutawayEntry rhs)
        {
            return (lhs.ItemId == rhs.ItemId) &&
                (lhs.LocationId == rhs.LocationId) &&
                (lhs.LocationName == rhs.ItemName) &&
                (lhs.LocationName == rhs.LocationName) &&
                (lhs.QuantityInLocation == rhs.QuantityInLocation);
        }
        public static bool operator !=(PutawayEntry lhs, PutawayEntry rhs)
        {
            return !(lhs == rhs);
        }

        public override bool Equals(object entry)
        {
            return entry is PutawayEntry && this == entry as PutawayEntry;
        }
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
