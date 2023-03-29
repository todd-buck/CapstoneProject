import { React, Box, useState, useEffect } from 'react';
import { Button, Grid ,useTheme } from '@mui/material';
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
    "price": null,
    "unit": null,
    "category": null,
    "subCategory": null,
    "quantityOnHand": null,
    "parLevel": null
}

const AddNewProductComponent = ({ addNewProductComponentVisibility, setAddNewProductComponentVisibility, refetch }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const handleClose = () => {
        setAddNewProductComponentVisibility(false);
    };

    const handleSubmit = () => {
        for (var prop in newProduct) {
            if (prop != "id" && !newProduct[prop]) {
                alert("Required field missing: " + prop);
                return;
            }
        }

        fetch("https://localhost:7105/api/item/add", {
            accept: 'application/json',
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newProduct)
        }).then((response) => response.status)
            .then((responseStatus) => {
                if (responseStatus == 451) {
                    alert("Critical Error: Item not found. Reloading Database.\nResponse: " + responseStatus.toString())
                }
            }).then(setAddNewProductComponentVisibility(false)).then(() => refetch())
    };

    return (
        <Dialog open={addNewProductComponentVisibility} onClose={handleClose}>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent>
                <Grid container direction="row" justifyContent="space-around" alignItems="flex-start" ml={0}>
                    <TextField
                        id="idField"
                        label="UPC (Optional)"
                        onChange={(e) => {
                            if (e.target.value != "")
                                newProduct.id = e.target.value;
                            else
                                newProduct.id = -1;
                        }}
                        sx={{ width:"45%", pb: 2, mt: 2}}
                    />
                    <TextField
                    id="nameField"
                    label="Item Name"
                    onChange={(e) => { newProduct.name = e.target.value }}
                    sx={{ width: "45%", pb: 2, mt: 2}}
                    />
                    <TextField
                        id="priceField"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        label="Price"
                        onChange={(e) => { newProduct.price = e.target.value }}
                        sx={{ width: "45%", pb: 2}}
                    />
                    <TextField
                        id="unitField"
                        label="Unit"
                        onChange={(e) => { newProduct.unit = e.target.value }}
                        sx={{ width: "45%", pb: 2}}
                    />
                    <TextField
                        id="categoryField"
                        label="Category"
                        onChange={(e) => { newProduct.category = e.target.value }}
                        sx={{ width: "45%", pb: 2}}
                    />
                    <TextField
                        id="subCategoryField"
                        label="Subcategory"
                        onChange={(e) => { newProduct.subCategory = e.target.value }}
                        sx={{ width: "45%", pb: 2}}
                    />
                    <TextField
                        id="onHandField"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">units</InputAdornment>,
                        }}
                        label="On-Hand"
                        onChange={(e) => { newProduct.quantityOnHand = e.target.value }}
                        sx={{ width: "45%"}}
                    />
                    <TextField
                        id="parLevelField"
                        label="Par Level"
                        onChange={(e) => { newProduct.parLevel = e.target.value }}
                        sx={{ width: "45%"}}
                    />
                </Grid>
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
};

export default AddNewProductComponent;

