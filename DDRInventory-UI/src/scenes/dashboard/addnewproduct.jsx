import React from 'react';
import {
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    InputAdornment,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const AddNewProductComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Typography variant="h1" sx={{ p: 2 }}>
                Add New Product
            </Typography>
            <FormControl>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    sx={{mb:2, width:'300px'}}
                />
                <TextField
                    id="quantity"
                    label="Quantity"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    variant="outlined"
                    sx={{ mb: 2, width: '300px' }}
                />
                <TextField
                    id="price"
                    label="Price"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    variant="outlined"
                    sx={{width: '150px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Select
                    id="select-option"
                    variant="outlined"
                >
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default AddNewProductComponent;

