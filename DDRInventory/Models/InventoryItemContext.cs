using DDRInventory.Objects;
using Microsoft.OpenApi.Writers;
using System.Data.Common;
using System.Data.SQLite;
using System.Xml.Linq;

namespace DDRInventory.Models
{
    public class InventoryItemContext
    {
        public static void AddItem(InventoryItem newItem)
        {
            Database catalog = new Database();
            SQLiteCommand insertItemCommand = catalog._connection.CreateCommand();
            insertItemCommand.CommandText = "INSERT INTO items (id, name, quantity, price, unit) VALUES($id, $name, $quantity, $price, $unit); ";
            insertItemCommand.Parameters.AddWithValue("$id", newItem.Id);
            insertItemCommand.Parameters.AddWithValue("$name", newItem.Name);
            insertItemCommand.Parameters.AddWithValue("$quantity", newItem.QuantityOnHand);
            insertItemCommand.Parameters.AddWithValue("$price", newItem.Price);
            insertItemCommand.Parameters.AddWithValue("$unit", newItem.Unit);
            Console.WriteLine($"Adding item '{newItem.Name}' to the database");
            insertItemCommand.ExecuteNonQuery();
            catalog.Close();
        }

        public static InventoryItem getItem(int id) {
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
                throw new ItemNotFoundException(id);
            }
        }

        public static bool UpdateItem(int id, string field, string value)
        {
            if (field.ToLower() == "id")
            {
                throw new OperationNotAllowedException("Updating an item's ID is disallowed. Please update another field.");
            }
            Database catalog = new Database();
            SQLiteCommand insertItemCommand = catalog._connection.CreateCommand();
            insertItemCommand.CommandText = $"UPDATE items SET {field} = $value WHERE id = {id};";
            insertItemCommand.Parameters.AddWithValue("$value", value);
            Console.WriteLine($"Updating item id {id}'s {field} to {value}");
            try
            {
                insertItemCommand.ExecuteNonQuery();
                return true;
            }
            catch(SQLiteException e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public static bool DeleteItem(int id)
        {
            Console.WriteLine($"Deleting item with ID {id}");
            try
            {
                getItem(id);
            }
            catch (ItemNotFoundException e)
            {
                Console.WriteLine($"Item with id {e.Id} does not exists. Delete operation terminated.");
                return false;
            }
            Database catalog = new Database();
            SQLiteCommand insertItemCommand = catalog._connection.CreateCommand();
            insertItemCommand.CommandText = $"DELETE FROM items WHERE id = {id};";
            try
            {
                insertItemCommand.ExecuteNonQuery();
                Console.WriteLine($"Item with id {id} removed from the database.");
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
