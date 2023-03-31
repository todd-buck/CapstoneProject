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
        public override string ToString()
        {
            if (this is null) return "Null Location";
            return $"Location {Id}. '{Name}'";
        }

        public static bool operator ==(Location lhs, Location rhs)
        {
            return (lhs.Name == rhs.Name) &&
                (lhs.Id == rhs.Id);
        }

        public static bool operator !=(Location lhs, Location rhs)
        {
            return !(lhs == rhs);
        }

        public override bool Equals(object location)
        {
            return location is Location && this == location as Location;
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
