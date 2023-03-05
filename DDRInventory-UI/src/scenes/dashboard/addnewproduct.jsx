import { React, Box, useState, useEffect } from 'react';
import { Button, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';

const newProduct = {
    "id": -1,
    "name": null,
    "quantityOnHand": null,
    "price": null,
    "unit": null,
    "category": null,
    "subCategory": null,
    "parLevel": null
}

const AddNewProductComponent = ({ setAddProductWindow, productCatalog, setProductCatalog }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        setAddProductWindow(false)
    };

    const handleSubmit = () => {
        for (var prop in newProduct) {
            if (prop == "id") continue;
            if (!newProduct[prop]) {
                console.log("Required fields missing from add new product dialog. Not submitting " + prop);
                return;
            }
        }
        console.log(newProduct);
        fetch("https://localhost:7105/api/item/add", {
            accept: 'application/json',
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newProduct)
        }).then((response) => response.status)
            .then((responseStatus) => {
                if (responseStatus == 451) {
                    console.log("Item not found. Response: " + responseStatus.toString())
                }
                else {
                    console.log("Exiting fetch post without error. Response: " + responseStatus.toString())
                }
            }).then(setAddProductWindow(false)).then(setOpen(false))

        //update local table
        productCatalog.push(newProduct);
        console.log(productCatalog);
        setProductCatalog([...productCatalog]);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new product to catalog</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="idField"
                    label="UPC (Optional)"
                    style={{ width: 200, float: 'right' }}
                    //helperText="Leave blank for no UPC"
                    onChange={(e) => {
                        if (e.target.value != "")
                            newProduct.id = e.target.value;
                        else
                            newProduct.id = -1;
                    }}
                />
                <TextField
                    margin="dense"
                    id="nameField"
                    label="Item Name"
                    style={{ width: 200 }}
                    onChange={(e) => { newProduct.name = e.target.value }}
                />
                <TextField
                    margin="dense"
                    id="categoryField"
                    label="Category"
                    style={{ width: 200, float: 'right' }}
                    onChange={(e) => { newProduct.category = e.target.value }}
                />
                <TextField
                    margin="dense"
                    id="subCategoryField"
                    label="Subcategory"
                    style={{ width: 200 }}
                    onChange={(e) => { newProduct.subCategory = e.target.value }}
                />
                <TextField
                    margin="dense"
                    id="onHandField"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">units</InputAdornment>,
                    }}
                    label="On-Hand"
                    style={{ width: 200, float: 'right' }}
                    onChange={(e) => { newProduct.quantityOnHand = e.target.value }}
                />
                <TextField
                    margin="dense"
                    id="priceField"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    label="Price"
                    style={{ width: 200 }}
                    onChange={(e) => { newProduct.price = e.target.value }}
                />
                <TextField
                    margin="dense"
                    id="unitField"
                    label="Unit"
                    style={{ width: 200, float: 'right' }}
                    onChange={(e) => { newProduct.unit = e.target.value }}
                />
                <TextField
                    margin="dense"
                    id="parLevelField"
                    label="Par Level"
                    style={{ width: 200, float: 'center' }}
                    onChange={(e) => { newProduct.parLevel = e.target.value }}
                />
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddNewProductComponent;

