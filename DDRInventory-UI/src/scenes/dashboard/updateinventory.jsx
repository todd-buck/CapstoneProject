import { React, Box, useState, useEffect } from 'react';
import { Button, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';

const UpdateInventoryComponent = ({ item, setUpdateInventoryWindow, productCatalog, setProductCatalog } ) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const [open, setOpen] = useState(true);

    const oldTable = productCatalog;
    const oldItem = item;

    const handleClose = () => {
        setOpen(false);
        setUpdateInventoryWindow(false);
    };

    const handleSubmit = () => {
        fetch("https://localhost:7105/api/item/update", {
            accept: 'application/json',
            method: 'PUT',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item)
        }).then((response) => response.status)
            .then((responseStatus) => {
                if (responseStatus == 451) {
                    console.log("Item not found. Response: " + responseStatus.toString())
                }
                else {
                    console.log(`Exiting fetch post without error. ${item.name} has been udpated. Response: ` + responseStatus.toString())
                }
            }).then(setUpdateInventoryWindow(false)).then(setOpen(false))

        //update local table
        productCatalog[oldTable.indexOf(oldItem)] = item;
        setProductCatalog([...productCatalog]);
    };

    if (!item) return (
        <div>
            loading...
        </div>
    );

    return (
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update {item.name}</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    id="nameField"
                    label="Item Name"
                    defaultValue={item.name}
                    style={{ width: 200 }}
                    onChange={(e) => { item.name = e.target.value} }
                        />
                <TextField
                    margin="dense"
                    id="categoryField"
                    label="Category"
                    defaultValue={item.category}
                    style={{ width: 200, float: 'right' }}
                    onChange={(e) => { item.category = e.target.value }}
                        />
                <TextField
                    margin="normal"
                    id="subCategoryField"
                    label="Subcategory"
                    defaultValue={item.subCategory}
                    style={{ width: 200 }}
                    onChange={(e) => { item.subCategory = e.target.value }}
                />
                <TextField
                    margin="normal"
                    id="onHandField"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">units</InputAdornment>,
                    }}
                    label="On-Hand"
                    defaultValue={item.quantityOnHand}
                    style={{ width: 200, float: 'right' }}
                    onChange={(e) => { item.quantityOnHand = e.target.value }}
                />
                <TextField
                    margin="normal"
                    id="priceField"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    label="Price"
                    defaultValue={parseFloat(item.price).toFixed(2)}
                    style={{ width: 200 }}
                    onChange={(e) => { item.price = e.target.value }}
                />
                <TextField
                    margin="normal"
                    id="unitField"
                    label="Unit"
                    defaultValue={item.unit}
                    style={{ width: 200, float: 'right' }}
                    onChange={(e) => { item.unit = e.target.value }}
                />
                <TextField
                    margin="normal"
                    id="parLevelField"
                    label="Par Level"
                    defaultValue={item.parLevel}
                    style={{ width: 200, float: 'center' }}
                    onChange={(e) => { item.parLevel = e.target.value }}
                />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ backgroundColor: colors.primary[300], color: colors.gray[100] }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        style={{ backgroundColor: colors.primary[300], color: colors.gray[100] }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
 
export default UpdateInventoryComponent;
