import { useMemo, useState } from 'react'

import MaterialReactTable from 'material-react-table';

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import useTheme from "@mui/material/styles/useTheme";

/* MUI ICONS*/
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    useQuery, useMutation
} from '@tanstack/react-query';

import { tokens } from "../../theme";

import { target_URL } from "../../App.js"

const LocationManagerComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const [addNewLocationComponentVisibility, setAddNewLocationComponentVisibility] = useState(null);
    const [newLocationName, setNewLocationName] = useState(null)

    //API GET for Product Catalog
    const { data, isFetchError, isFetching, refetch } = useQuery({
        queryKey: [
            'location-data',
        ],
        queryFn: async () => {
            const fetchURL = new URL(
                '/api/location/catalog',
                target_URL,
            );

            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        }
    });

    //API DELETE for Product Catalog Item
    const deleteItem = useMutation({
        mutationFn: (locationId) => {
            fetch(target_URL + "/api/location/delete/" + locationId.toString(), {
                method: 'DELETE',
                mode: 'cors',
            }).then(() => {
                refetch()
            })
        }
    });

    const handleDeleteMany = (rows) => {
        rows.map((row) => deleteItem.mutate(row.original.id))
    }

    //if back-end table schema is changed, this will need to be updated
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'name',
                header: 'Location Name',
            } 
        ],
        [],
    );

    return (
        <Box>
            {addNewLocationComponentVisibility ? (newLocationModal(colors, newLocationName, setNewLocationName, addNewLocationComponentVisibility, setAddNewLocationComponentVisibility, refetch)) : null}

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
                enableResizing
                enableStickyHeader
                enableRowSelection
                enableMultiRowSelection
                enableRowActions
                positionActionsColumn="last"

                //Error Messages
                muiToolbarAlertBannerProps={
                    isFetchError ? { color: 'error', children: 'Error loading data.' } : {}
                }

                //Top Toolbar Buttons
                renderTopToolbarCustomActions={({ table }) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {/*Add New Location Button*/}
                        <Tooltip arrow title="Add New Location">
                            <Button
                                sx={{ backgroundColor: colors.addAccent[600] }}
                                onClick={() => {
                                    setAddNewLocationComponentVisibility(true)
                                }}
                                variant="contained"
                            >
                                + New Location
                            </Button>
                        </Tooltip>

                        {/*Delete Button*/}
                        <Button
                            sx={{
                                backgroundColor: colors.removeAccent[500],
                                "&.Mui-disabled": {
                                    backgroundColor: ''
                                }
                            }}
                            onClick={() => {
                                handleDeleteMany(table.getSelectedRowModel().rows)
                                table.reset()
                            }}
                            variant="contained"
                            disabled={table.getSelectedRowModel().rows.length < 1}
                        >
                            Delete
                        </Button>

                        {/*Refresh Button*/}
                        <Tooltip arrow title="Refresh Data">
                            <IconButton onClick={refetch}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}

                //Buttons that appear on every row
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', flexDirextion: 'row' }} >
                        {/*Delete Button*/}
                        <IconButton
                            onClick={() => {
                                deleteItem.mutate(row.getValue('id'))
                            }}
                            sx={{
                                "&:hover": {
                                    color: colors.removeAccent[500]
                                }
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}

                state={{
                    showAlertBanner: isFetchError,
                    showProgressBars: isFetching,
                }}
            />
        </Box>
    );
};

const newLocationModal = (colors, newLocationName, setNewLocationName, addNewLocationComponentVisibility, setAddNewLocationComponentVisibility, refetch) => {

    return (
        <Box>
            <Modal
                open={addNewLocationComponentVisibility != null}
                onClose={() => {
                    setAddNewLocationComponentVisibility(null)
                }}

                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ backgroundColor: colors.primary[100], p: 2, minWidth: "20vw" }}>
                    <Typography variant="h3" sx={{borderBottom: 1, mb: 3}}>
                        New Location
                    </Typography>

                    <Box>
                        <TextField
                            id="standard-helperText"
                            label="Location Name"
                            focused
                            onChange={(e) => setNewLocationName(e.target.value) }
                        />
                    </Box>

                    { /*Buttons*/}
                    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", mt: 2 }} >
                        <Button
                            onClick={() => {
                                setAddNewLocationComponentVisibility(null)
                            }}
                            sx={{ mx: 1 }}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {

                                fetch(target_URL + "/api/location/add/" + newLocationName, {
                                    accept: 'application/json',
                                    method: 'POST',
                                    mode: 'cors',
                                    headers: { 'content-type': 'application/json' },
                                }).then(() => setAddNewLocationComponentVisibility(null))
                                    .then(() => refetch())
                            }}
                            sx={{ mx: 1 }}
                            variant="contained"
                            disabled={newLocationName === null}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default LocationManagerComponent;

