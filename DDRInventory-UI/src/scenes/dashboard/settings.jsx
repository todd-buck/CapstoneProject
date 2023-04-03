import React, { useState } from 'react';
import { useContext } from "react";
import { Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from "../../theme";
import { Select, MenuItem } from '@mui/material';
import { Box } from '../../../node_modules/@mui/material/index';

const SettingsComponent = ({ scheme, setScheme }) => {
    const theme = useTheme();

    const handleChange = event => {
        setScheme(event.target.value);
    };

    return (
        <div>
            <Typography variant="h1" sx={{p:2}}>
                Settings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant="h4" sx={{p:2}}>
                    Select Color Scheme:
                </Typography>
                <Select value={scheme} onChange={handleChange}>
                    <MenuItem value="default">Default</MenuItem>
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