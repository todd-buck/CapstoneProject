import React, { useState } from 'react';
import { useContext } from "react";
import { Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from "../../theme";
import { Select, InputLabel, MenuItem } from '@mui/material';
import { Box } from '../../../node_modules/@mui/material/index';

const SettingsComponent = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);
    const colorMode = useContext(ColorModeContext);
    const [selectedScheme, setSelectedScheme] = useState('default');

    const handleChange = (event) => {
        setSelectedScheme(event.target.value);
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
                <Select value={selectedScheme} onChange={handleChange}>
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