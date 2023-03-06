import { tokens } from "../../theme";
import { Typography, useTheme } from '@mui/material';
const DocumentationComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <h1>Documentation</h1>
            <br></br>
            <Typography variant="h3" sx={{ color: colors.redAccent[400] }}>
                The Dashboard
            </Typography>
            <p>Not Impelemented</p>
            <Typography variant="h3" sx={{ color: colors.redAccent[400] }}>
                The Product Catalog
            </Typography>
            <p>The product catalog is the one-stop-shop for viewing all of the product in inventory, making inventory adjustments, and adding and removing items from the inventory.
                It features a variable-length table, sorting and filtering options, and column view controls.</p>
            <Typography variant="h5" sx={{ color: colors.redAccent[400] }}>
                Viewing the Inventory
            </Typography>
            <p>The table defaults to sorting all items by their UPC. To change the sorting, click the 3 dots next to the desired header and click the sort button. Using this context menu, the table
                can also be filtered by column values and specified rows can be hidden.</p>
            <Typography variant="h5" sx={{ color: colors.redAccent[400] }}>
                Inventory Adjustments
            </Typography>
            <p>To proccess an adjustment to an item in the inventory, click the pencil icon in the actions column of the desired item. In the resulting menu, the item's name,
                quantity on hand, category, subcategory, price, unit, and par-level can all be adjusted. When the item's information is updated, the values are bundled into a
                JSON object and passed to the controller APIf in the body of the message. The server then proccesses the changes in the SQLite database. The API call returns
                true if the upadte was successful and false if the update was not successful if, for indtance, the databse file was locked by the server's filesystem. Each API
                also has certain HTTP response status codes, which are documented below.</p>
            <Typography variant="h5" sx={{ color: colors.redAccent[400] }}>
                Adding Products to the Inventory
            </Typography>
            <p>To add a product to the catalog, click the green "+New Item" button at the top right of the catalog menu, enter the product information in the resulting dialog
                (except UPC, if not applicable) and click submit. when submitting, the front end performs data validation on the input to ensure that no field will be
                passed to the controller with a null value. The controller then received the inventory item as an object and adds it to the SQLite database, generating
                a product ID that is not the same length as a UPC if a UPC is not provided. The AddItem API call returns the products ID, which is useful if the controller
                generated an item ID for the user.</p>
            <Typography variant="h3" sx={{ color: colors.redAccent[400] }}>
                Importing a CSV
            </Typography>
            <p>In some instances, a user may wish to import a backup of all items in the catalog. This is useful for transferring the information for the items in the catalog
                to another restaurant location. To import a CSV into the product catalog, click the "Import CSV" item on the sidebar, upload a CSV file, and click submit. The items
                in the CSV will now be visible in the product catalog. If any product in the CSV had UPC that already exists in the system, then the controller only
                processes an update to that item's information. If an item is added from the CSV that contains a non-UPC length ID, that means that the user did not include a
                UPC when the item was added to the inventory, so the product ID was randomly generated. As such, if one of these items is in the imported CSV, the controller
                will add that item with a newly generated ID. It is the responsibility of the user to manage duplicate items for which there is no UPC.</p>
        </div>
    );
}

export default DocumentationComponent;