import React, { useMemo, useState, useEffect } from 'react'
import { Autocomplete, Box, Button, IconButton, Modal, Tooltip, TextField, Typography, useTheme } from '@mui/material';
import UnderConstructionComponent from '../global/underConstruction.jsx'


const ReportsComponent = () => {
    const reportOptions = ["Log Report"]
    const [activeReport, setActiveReport] = useState(null)

    return (
        <Box>
            <Autocomplete
                sx={{ width: "25%" }}
                autoComplete
                options={Array.isArray(reportOptions) ? reportOptions : []}
                renderInput={(data) => (
                    <TextField {...data} variant="outlined" label="Reports" />
                )}
                onChange={(event, newValue) => {
                    setActiveReport(newValue);
                }}
            />
            <Box>
                { activeReport === "Log Report" ? LogReport() : null}
            </Box>
        </Box>
    );
}

const LogReport = () => {
    <p> This is a test. </p>
}
 
export default ReportsComponent;