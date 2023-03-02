import { React, Box, useEffect } from 'react';
import { Button, useTheme } from '@mui/material';

import { tokens } from "../../theme";

const UpdateInventoryComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const base_url = "https://localhost:3000";

        const deleteItem = async (api_method, id) => {
            try {
                const response = await fetch(base_url + api_method + id);
                const responseData = await response.json()
            } catch (error) {
                console.error(error);
            }
        };  

    }, []);


    return (
        <Button variant="contained" sx={{ backgroundColor: colors.primary[400] }}>
            Click Me To Load Component
        </Button>
    );
}
 
export default UpdateInventoryComponent;
