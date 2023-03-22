import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { Select, InputLabel, MenuItem } from '@mui/material';
import { Box } from '../../../node_modules/@mui/material/index';

const SettingsComponent = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedOption, setSelectedOption] = useState('light');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <Typography variant="h1" sx={{p:2}}>
                Settings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant="h4" sx={{p:2}}>
                    Select Theme:
                </Typography>
                <Select value={selectedOption} onChange={handleChange}>
                    <MenuItem value="light">Light (Default)</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="contrast">Contrast</MenuItem>
                    <MenuItem value="desert">Desert</MenuItem>
                    <MenuItem value="flamingo">Flamingo</MenuItem>
                    <MenuItem value="sea">Sea</MenuItem>
                    <MenuItem value="daisy">Daisy</MenuItem>
                </Select>
            </Box>
        </div>
    );
}

export default SettingsComponent;