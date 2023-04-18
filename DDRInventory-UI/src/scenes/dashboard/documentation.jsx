import { tokens } from "../../theme";

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import useTheme from "@mui/material/styles/useTheme";

/* MUI ICONS */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DocumentationComponent = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    // topic summary styles
    const topicSummaryStyle = {
        pl: 2, pt: 2, pb: 2,
        mt: 2, mb: 2,
        backgroundColor: colors.primary[200],
        color: colors.gray[100],
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 3,
        textAlign: 'left',
    };
    const topicSummaryVariant = "h3";

    // topic details styles
    const topicDetailsStyle = {
        color: colors.gray[100],
        pb: 6, // WHY DOES THIS NOT WORK? #FIXME
    };
    const topicDetailsVariant = "p";

    // subtopic left indent
    const subtopicIndent = {
        mt: 2,
        ml: 6,
        mb: 2,
        maxWidth: 852,
    };

    const autoExpand = false;

    // subtopic summary styles
    const subtopicSummaryBoxStyle = {
        backgroundColor: colors.primary[200],
    };
    const subtopicSummaryTextStyle = {
        color: colors.splashAccent[100],
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 3,
        textAlign: 'left',
    };
    const subtopicSummaryTextVariant = "h5";

    // subtopic details styles
    const subtopicDetailsBoxStyle = {
        backgroundColor: colors.primary[300],
    };
    const subtopicDetailsTextStyle = {
        
    };
    const subtopicDetailsTextVariant = "p";

    return (
        <div style={{ maxWidth: 900}}>
            <h1>Documentation</h1>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                The Dashboard
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                Under construction
            </Typography>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                The Product Catalog
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                The product catalog is the one-stop-shop for viewing all of the product in inventory, making inventory adjustments, adding and removing items from the inventory, and making PutAway adjustments. It features a variable-length table, sorting and filtering options, and column view controls.
            </Typography>

            <Box sx={subtopicIndent}>
                <Accordion defaultExpanded={autoExpand}>
                <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Viewing the Inventory
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            The table defaults to sorting all items by their UPC. To change the sorting, click the 3 dots next to the desired header and click the sort button. Using this context menu, the table
                            can also be filtered by column values and specified rows can be hidden.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Inventory Adjustments
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            To proccess an adjustment to an item in the inventory, click the dollar sign icon in the actions column of the desired item. In the resulting menu, the item's
                            on-handquantity can be adjusted. be adjusted. When the item's quantity is updated, the value is bundled into a
                            JSON object and passed to the controller API in the body of HTTP request the message. The server then proccesses the changes in the SQLite database. The API call returns
                            true if the update was successful and false if the update was not successful if, for instance, the databse file was locked by the server's filesystem. Each API
                            also has certain HTTP response status codes, which are documented below.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Adding Products to the Inventory
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            To add a product to the catalog, click the green "+New Item" button at the top right of the catalog menu, enter the product information in the resulting dialog
                            (except UPC, if not applicable) and click submit. when submitting, the front end performs data validation on the input to ensure that no field will be
                            passed to the controller with a null value. The controller then received the inventory item as an object and adds it to the SQLite database, generating
                            a product ID that is not the same length as a UPC if a UPC is not provided. The AddItem API call returns the products ID, which is useful if the controller
                            generated an item ID for the user.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                    <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Modifying PutAway Entries From the Product Catalog
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            To modify the PutAway entries for a specific item, click the circular 'i' icon in the actions column. From the resulting menu,
                            the per-location quantity for a product can be adjusted for all locations where the product has been stored.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                Viewing Reports
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                To view reports, click the "reports" button on the sidebar. There, a log can be viewed that shows the actions that a user has taken. The reports and be sorted
                by type, date, time, etc. These reports are useful for seeing where a putaway adjustment error occurred or monitoring inventory adjustments to prevent internal theft.
            </Typography>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                Importing a CSV
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                In some instances, a user may wish to import a backup of all items in the catalog. This is useful for transferring the information for the items in the catalog
                to another restaurant location. To import a CSV into the product catalog, click the "Import CSV" item on the sidebar, upload a CSV file, and click submit. The items
                in the CSV will now be visible in the product catalog. If any product in the CSV had UPC that already exists in the system, then the controller only
                processes an update to that item's information. If an item is added from the CSV that contains a non-UPC length ID, that means that the user did not include a
                UPC when the item was added to the inventory, so the product ID was randomly generated. As such, if one of these items is in the imported CSV, the controller
                will add that item with a newly generated ID. It is the responsibility of the user to manage duplicate items for which there is no UPC.
            </Typography>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                The Location Manager
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                Breeze Inventory Management System support per-locaiton-inventory management, referred to as "PutAway". The location manager allows a user to add or remove named locations
                to or from the system. To add a location, simply click the "+ New Location" button and input a location name. Location IDs are automatically assigned to each new location.
            </Typography>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                The PutAway Manager
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                To manage an inventory entry in a specific location, locate the desired item by its name or be the location in which it resides by selecting "Find my item" or "Find by Location".
                If finding by item, in the resulting menu, the per-location quantity for a product can be adjusted for all locations where the product has been stored.
                If finding by location, in the resulting menu, the per-location quantity for a product can be adjusted for items in the selected location.
            </Typography>

            <Typography variant={topicSummaryVariant} sx={topicSummaryStyle}>
                HTTP Response Codes
            </Typography>
            <Typography variant={topicDetailsVariant} sx={topicDetailsStyle}>
                The inventory management software back-end returns many different HTTP response codes when erorrs occur. Those response codes are listed below with their meanings.
            </Typography>

            <Box sx={subtopicIndent}>
                <Accordion defaultExpanded={autoExpand}>
                    <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Error 204
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            Error 204 means "No content" and is returned by the /api/item/catalog API call to signify that the catalog is empty.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                    <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Error 400
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            Error 400 means "Bad Request" and is returned by the /api/item/uploadCSV API call to signify that the CSV was not parsed correctly. The user should be prompted to check the file formatting and try again.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                    <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Error 451
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            Error 451 means "Item Not Found" and is returned by the /api/item/&#123;id&#125;, /api/item/update, /api/item/delete/&#123;id&#125; and /api/item/deleteMany API calls to signify that the requested item was not found in the catalog. Ideally, this error will have no path to be thrown due to how the front-end handles these API requests. It is possible though, for this error to be thrown if more than one user is logged in a one time.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                    <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Error 501
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            Error 501 means "Not Implemented" and is returned by any API call that has not had it's back-end functions completely implemented.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={autoExpand}>
                <AccordionSummary sx={subtopicSummaryBoxStyle} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography sx={subtopicSummaryTextStyle} variant={subtopicSummaryTextVariant}>
                            Error 512
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={subtopicDetailsBoxStyle}>
                        <Typography sx={subtopicDetailsTextStyle} variant={subtopicDetailsTextVariant}>
                            Error 512 means "Unspecified SQL Error" and is returned by any API call when an error occurred when reading from or writing to the database.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>
    );
}

//501 Not Implemented (This means what you think it means)
//512: General unspecified SQL error
export default DocumentationComponent;