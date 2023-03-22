using CsvHelper.Configuration;
using DDRInventory.Objects;
using System.Data.SQLite;


namespace DDRInventory.Models
{
    public class InventoryItemContext
    {
        public static void AddItem(InventoryItem newItem)
        {
            if (GetAllIds().Contains(newItem.Id))
            {
                newItem.Id = InventoryItem.GenerateId();
            }
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

        public static void AddItems(List<InventoryItem> newItems)
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand insertItemCommand = catalog._connection.CreateCommand())
                {
                    insertItemCommand.CommandText = "INSERT INTO items (id, name, quantity, price, unit, category, subcategory, par_level) VALUES($id, $name, $quantity, $price, $unit, $category, $subcategory, $par_level); ";
                    foreach (InventoryItem newItem in newItems)
                    {
                        if (GetAllIds().Contains(newItem.Id))
                        {
                            newItem.Id = InventoryItem.GenerateId();
                        }
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
                    }
                    catalog.Dispose();
                }
            }
        }

        public static bool DeleteAll()
        {
            Console.WriteLine($"Deleting all items from the database");
            using (Database catalog = new Database())
            {
                using (SQLiteCommand insertItemCommand = catalog._connection.CreateCommand())
                {
                    insertItemCommand.CommandText = "DELETE FROM items;";
                    insertItemCommand.ExecuteNonQuery();
                    Console.WriteLine($"All items removes from the catalog");
                    return true;
                }
            }
        }

        public static bool DeleteItem(string id)
        {
            Console.WriteLine($"Deleting item with ID {id}");
            try
            {
                GetItem(id);
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
                    insertItemCommand.ExecuteNonQuery();
                    Console.WriteLine($"Item with id {id} removed from the database.");
                    return true;
                }
            }
        }
        public static List<InventoryItem> GetAllItems()
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
                            Id = reader.GetString(0),
                            Name = reader.GetString(1),
                            QuantityOnHand = reader.GetInt32(2),
                            Price = reader.GetDecimal(3),
                            Unit = reader.GetString(4),
                            Category = reader.GetString(5),
                            SubCategory = reader.GetString(6),
                            ParLevel = reader.GetInt32(7)
                        });
                    }
                    return items;
                }
            }
        }

        private static List<string> GetAllIds()
        {
            using (Database catalog = new Database())
            {
                using (SQLiteCommand allItemsQuery = catalog._connection.CreateCommand())
                {
                    Console.WriteLine("Retrieving all items from the database");
                    List<string> items = new List<string>();
                    allItemsQuery.CommandText = "SELECT * FROM items;";

                    SQLiteDataReader reader = allItemsQuery.ExecuteReader();
                    while (reader.Read())
                    {
                        items.Add(reader.GetString(0));
                    }
                    return items;
                }
            }
        }

        public static InventoryItem GetItem(string id)
        {
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
                                Id = reader.GetString(0),
                                Name = reader.GetString(1),
                                QuantityOnHand = reader.GetInt32(2),
                                Price = reader.GetDecimal(3),
                                Unit = reader.GetString(4),
                                Category = reader.GetString(5),
                                SubCategory = reader.GetString(6),
                                ParLevel = reader.GetInt32(7)
                            };
                            Console.WriteLine($"Item {id} ({returnVal.Name}) found.");
                            Console.WriteLine($"Item {id} ({returnVal.Name}) found.");
                            return returnVal;
                        }
                        else
                        {
                            throw new ItemNotFoundException($"Item {id} not found", id);
                        }
                    }
                }
            }
        }

        public static bool UpdateItem(InventoryItem updatedItem)
        {
            GetItem(updatedItem.Id); // this throw exception if the item does not exist.
            using (Database catalog = new Database())
            {
                using (SQLiteCommand updateItemCommand = catalog._connection.CreateCommand())
                {
                    updateItemCommand.CommandText = $"UPDATE items SET name = $name, quantity = $quantity, price = $price, unit = $unit, category = $category, subcategory = $subcategory, par_level = $par_level WHERE id = {updatedItem.Id};";
                    updateItemCommand.Parameters.AddWithValue("$name", updatedItem.Name);
                    updateItemCommand.Parameters.AddWithValue("$quantity", updatedItem.QuantityOnHand);
                    updateItemCommand.Parameters.AddWithValue("$price", updatedItem.Price);
                    updateItemCommand.Parameters.AddWithValue("$unit", updatedItem.Unit);
                    updateItemCommand.Parameters.AddWithValue("$category", updatedItem.Category);
                    updateItemCommand.Parameters.AddWithValue("$subcategory", updatedItem.SubCategory);
                    updateItemCommand.Parameters.AddWithValue("$par_level", updatedItem.ParLevel);
                    Console.WriteLine($"Updating item id {updatedItem.Id}'s properties");
                    updateItemCommand.ExecuteNonQuery();
                    return true;
                }
            }
        }
    }
}