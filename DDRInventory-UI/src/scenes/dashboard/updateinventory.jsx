/* MUI COMPONENTS */
import { useState } from 'react'

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import useTheme from "@mui/material/styles/useTheme";

import { tokens } from "../../theme";

import { target_URL } from "../../App.js"

const UpdateInventoryComponent = ({ item, setUpdateInventoryComponentVisibility, refetch } ) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const [quantitySold, setQuantitySold] = useState(0)

    const handleClose = () => {
        setQuantitySold(0);
        setUpdateInventoryComponentVisibility(null);
        refetch()
    };

    const handleSubmit = () => {
        if (quantitySold < item.quantityOnHand) {
            item.quantityOnHand = item.quantityOnHand - quantitySold
        } else {
            item.quantityOnHand = 0
        }

        fetch(target_URL + "/api/item/update", {
            accept: 'application/json',
            method: 'PUT',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item)
        }).then((response) => response.status)
            .then((responseStatus) => {
                if (responseStatus === 451) {
                    console.log("Item not found. Response: " + responseStatus.toString())
                }
                else {
                    console.log(`Exiting fetch post without error. ${item.name} has been udpated. Response: ` + responseStatus.toString())
                }
            }).then(setUpdateInventoryComponentVisibility(null)).then(() => { setQuantitySold(0) }).then(() => {refetch()})
    };

    if (!item) return (
        <div>
            loading...
        </div>
    );

    return (
            <Dialog open={item !== null} onClose={handleClose}>
            <DialogTitle variant="h2">{item.name}</DialogTitle>
            <DialogContent>
                <Typography variant="h3" sx={{mb:1}}>
                    {item.unit + "(s) Sold:"}
                </Typography>
                <TextField
                    id="quantitySoldlField"
                    error={quantitySold > item.quantityOnHand || quantitySold < 0}
                    value={quantitySold}
                    onChange={(event) => setQuantitySold(Number(event.target.value))}
                    type="number"
                />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            backgroundColor: colors.changeAccent[500],
                            mx: 1
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={quantitySold > item.quantityOnHand || quantitySold <= 0}
                        sx={{
                            backgroundColor: colors.addAccent[500],
                            mx: 1
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
 
export default UpdateInventoryComponent;
