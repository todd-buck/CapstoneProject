import React, { useState, useEffect } from 'react'

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import InventoryCatalog from './inventoryCatalog';

const Dashboard = () => {
    const theme = useTheme();

    return (
        <InventoryCatalog /> 
    )
}

export default Dashboard;