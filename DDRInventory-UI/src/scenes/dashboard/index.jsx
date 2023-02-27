import React, { useState, useEffect } from 'react'

import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import InventoryCatalog from './inventoryCatalog';

const Dashboard = ({ selected }) => {
    const theme = useTheme();

    return (
        <Box>
            {selected === 'test' ? (
                <InventoryCatalog />
            ) : (
                <div>Welcome to the dashboard!</div>
            )}
            
        </Box>
    )
}

export default Dashboard;