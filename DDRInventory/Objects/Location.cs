namespace DDRInventory.Objects
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class LocationNotFoundException : Exception
    {
        public string Id { get; }
        public LocationNotFoundException(string message, string id) : base(message)
        {
            Id = id;
        }
    }
}
