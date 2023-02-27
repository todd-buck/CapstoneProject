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
            using (Database catalog = new Database())
            {
                using (SQLiteCommand insertItemCommand = catalog._connection.CreateCommand())
                {
                    insertItemCommand.CommandText = "INSERT INTO items (id, name, quantity, price, unit, category, subcategory, par_level) VALUES($id, $name, $quantity, $price, $unit, $category, $subcategory, $par_level); ";
                    insertItemCommand.Parameters.AddWithValue("$id", newItem.Id);
                    insertItemCommand.Parameters.AddWithValue("$name", newItem.Name);
                    insertItemCommand.Parameters.AddWithValue("$quantity", newItem.QuantityOnHand);
                    insertItemCommand.Parameters.AddWithValue("$price", newItem.Price);
                    insertItemCommand.Parameters.AddWithValue("$unit", newItem.Unit);
                    insertItemCommand.Parameters.AddWithValue("$category", newItem.Category);
                    insertItemCommand.Parameters.AddWithValue("$subcategory", newItem.SubCategory);
                    insertItemCommand.Parameters.AddWithValue("$par_level", newItem.ParLevel);
                    Console.WriteLine($"Adding item '{newItem.Name}' to the database");
                    insertItemCommand.ExecuteNonQuery();
                    catalog.Dispose();
                }
            }
        }

        public static InventoryItem getItem(int id) {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand itemQuery = catalog._connection.CreateCommand())
                {
                    Console.WriteLine($"Retrieving item {id} from the database");
                    itemQuery.CommandText = "SELECT * FROM items WHERE id = " + id.ToString() + ";";
                    using (SQLiteDataReader reader = itemQuery.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            InventoryItem returnVal = new InventoryItem
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                QuantityOnHand = reader.GetInt32(2),
                                Price = reader.GetDecimal(3),
                                Unit = reader.GetString(4),
                                Category = reader.GetString(5),
                                SubCategory = reader.GetString(6),
                                ParLevel = reader.GetInt32(7)
                            };
                            Console.WriteLine($"Item {id} ({returnVal.Name}) found.");
                            return returnVal;
                        }
                        else
                        {
                            Console.Write($"Item {id} not found");
                            throw new ItemNotFoundException(id);
                        }
                    }
                }
            }
        }

        public static bool UpdateItem(int id, string field, string value)
        {
            if (field.ToLower() == "id")
            {
                throw new OperationNotAllowedException("Updating an item's ID is disallowed. Please update another field.");
            }
            using (Database catalog = new Database())
            {
                using (SQLiteCommand updateItemCommand = catalog._connection.CreateCommand())
                {
                    updateItemCommand.CommandText = $"UPDATE items SET {field} = $value WHERE id = {id};";
                    updateItemCommand.Parameters.AddWithValue("$value", value);
                    Console.WriteLine($"Updating item id {id}'s {field} to {value}");
                    try
                    {
                        updateItemCommand.ExecuteNonQuery();
                        return true;
                    }
                    catch (SQLiteException e)
                    {
                        Console.WriteLine(e.Message);
                        return false;
                    }
                }
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
            using (Database catalog = new Database())
            {
                using (SQLiteCommand insertItemCommand = catalog._connection.CreateCommand())
                {
                    insertItemCommand.CommandText = $"DELETE FROM items WHERE id = {id};";
                    try
                    {
                        insertItemCommand.ExecuteNonQuery();
                        Console.WriteLine($"Item with id {id} removed from the database.");
                        return true;
                    }
                    catch (SQLiteException e)
                    {
                        Console.WriteLine($"Caught Exception {e.Message}");
                        return false;
                    }
                }
            }
        }

        public static List<InventoryItem> getAllItems()
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand allItemsQuery = catalog._connection.CreateCommand())
                {
                    Console.WriteLine("Retrieving all items from the database");
                    List<InventoryItem> items = new List<InventoryItem>();
                    allItemsQuery.CommandText = "SELECT * FROM items;";

                    SQLiteDataReader reader = allItemsQuery.ExecuteReader();
                    while (reader.Read())
                    {
                        items.Add(new InventoryItem
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            QuantityOnHand = reader.GetInt32(2),
                            Price = reader.GetDecimal(3),
                            Unit = reader.GetString(4),
                            Category= reader.GetString(5),
                            SubCategory= reader.GetString(6),
                            ParLevel= reader.GetInt32(7)
                        });
                    }
                    return items;
                }
            }
        }
    }
}