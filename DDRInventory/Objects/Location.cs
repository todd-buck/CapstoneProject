using DDRInventory.Models;

namespace DDRInventory.Objects
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static int GenerateId()
        {
            int currentId = 1;
            while (true)
            {
                try
                {
                    LocationContext.GetLocation(currentId);
                    currentId++;
                }
                catch (LocationNotFoundException)
                {
                    return currentId;
                }
            }
        }
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
