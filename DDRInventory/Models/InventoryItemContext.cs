using DDRInventory.Objects;
using System.Data.Common;
using System.Data.SQLite;

namespace DDRInventory.Models
{
    public class InventoryItemContext
    {
        public static void AddItem(InventoryItem newItem)
        {
            Database catalog = new Database();
            SQLiteCommand insertItemCommand = catalog._connection.CreateCommand();
            insertItemCommand.CommandText = "INSERT INTO items (id, name, quantity, price, unit) VALUES(" + newItem.ToString() + "); ";
            Console.WriteLine($"Adding item '{newItem.Name}' to the database");
            insertItemCommand.ExecuteNonQuery();
            catalog.Close();
        }

        public static InventoryItem getItem(long id) {
            // invalid ids will throw an exception?? or just return an empty InventoryItem object?
            Database catalog = new Database();
            SQLiteCommand allItemsQuery = catalog._connection.CreateCommand();
            allItemsQuery.CommandText = "SELECT * FROM items WHERE id = " + id.ToString() + ";";
            SQLiteDataReader reader = allItemsQuery.ExecuteReader();
            if (reader.Read())
            {
                return new InventoryItem
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    QuantityOnHand = reader.GetInt32(2),
                    Price = reader.GetDecimal(3),
                    Unit = reader.GetString(4)
                };
            }
            else
            {
                throw new Exception(); //FIXME
            }
        }

        public static bool UpdateItem(long id, string field, string value)
        {
            // should throw exception when trying to change id??? front end should never do this but we also don't control the front end... if (field == id)...
            Database catalog = new Database();
            SQLiteCommand insertItemCommand = catalog._connection.CreateCommand();
            insertItemCommand.CommandText = $"UPDATE items SET {field} = '{value}' WHERE id = {id};";
            Console.WriteLine($"Updating item id {id}'s {field} to {value}");
            try
            {
                insertItemCommand.ExecuteNonQuery();
                return true;
            }
            catch(SQLiteException e)
            {
                return false;
            }

        }

        public static bool DeleteItem(long id)
        {
            //this should outright return false if that id does not exist.
            Database catalog = new Database();
            SQLiteCommand insertItemCommand = catalog._connection.CreateCommand();
            insertItemCommand.CommandText = $"DELETE FROM items WHERE id = {id};";
            Console.WriteLine($"Deleting item with id {id} from the database.");
            try
            {
                insertItemCommand.ExecuteNonQuery();
                return true;
            }
            catch (SQLiteException e)
            {
                return false;
            }

        }

        public static List<InventoryItem> getAllItems()
        {
            List<InventoryItem> items = new List<InventoryItem>();
            Database catalog = new Database();
            SQLiteCommand allItemsQuery = catalog._connection.CreateCommand();
            allItemsQuery.CommandText = "SELECT * FROM items;";

            SQLiteDataReader reader = allItemsQuery.ExecuteReader();
            while (reader.Read())
            {
                items.Add(new InventoryItem
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    QuantityOnHand= reader.GetInt32(2),
                    Price= reader.GetDecimal(3),
                    Unit = reader.GetString(4)

                });
            }
            catalog.Close();
            return items;
        }
    }
}
