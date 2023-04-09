import { useMemo, useState } from 'react'

/* MUI COMPONENTS */
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import useTheme from "@mui/material/styles/useTheme";

import { tokens } from "../../theme";

import MaterialReactTable from 'material-react-table';

import {
    useQuery
} from '@tanstack/react-query';

const ReportsComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const reportOptions = ["Log Report"]
    const [activeReport, setActiveReport] = useState(null)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'time',
                header: 'Time',
            },
            {
                accessorKey: 'user',
                header: 'User',
            },
            {
                accessorKey: 'action',
                header: 'Action',
            },
            {
                accessorKey: 'reason',
                header: 'Reason',
            },
            {
                accessorKey: 'adjustment',
                header: 'Adjustment',
            },
            {
                accessorKey: 'itemName',
                header: 'ItemName',
            },
            {
                accessorKey: 'locationName',
                header: 'LocationName',
            },
        ],
        [],
    );

    //API GET for Product Catalog
    const { data, isFetchError, isFetching } = useQuery({
        queryKey: [
            'log-data',
        ],
        queryFn: async () => {
            const fetchURL = new URL(
                '/api/log/all',
                'https://localhost:7105',
            );

            const response = await fetch(fetchURL.href);
            const json = await response.json();
            console.log(json)
            return json;
        }
    });

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
            <Box sx={{ mt: 3 }}>
                {activeReport && <Typography variant="h1" sx={{mb:1}}>
                    {activeReport}
                </Typography>}
                { activeReport === "Log Report" ? LogReport(colors, columns, data, isFetchError, isFetching) : null}
            </Box>
        </Box>
    );
}

const LogReport = (colors, columns, data, isFetchError, isFetching) => {

    return (
        <MaterialReactTable
            columns={columns}
            data={data ? data : []} //displays an empty table if no row data from API call}

            muiTableBodyProps={{
                sx: {
                    '& tr:nth-of-type(odd)': {
                        backgroundColor: colors.primary[200],
                    },
                },
            }}

            //Options
            enableColumnOrdering
            enableGrouping
            enableResizing
            enableStickyHeader
            positionActionsColumn="last"

            //Error Messages
            muiToolbarAlertBannerProps={
                isFetchError ? { color: 'error', children: 'Error loading data.' } : {}
            }

            state={{
                showAlertBanner: isFetchError,
                showProgressBars: isFetching,
            }}
        />
    )
}
 
export default ReportsComponent;