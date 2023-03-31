import React, { useMemo, useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Autocomplete, Box, Button, IconButton, Modal, Tooltip, TextField, Typography, useTheme } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import {
    useQuery, useMutation
} from '@tanstack/react-query';
import { tokens } from "../../theme";

//TODO:
//  Code Search Bar Button onClick
//  Call API/Fill Item Information Box based on select (if this is not an option, do it based on search button in search bar)

const UpdatePutawayLocationComponent = ({ updatePutawayLocationComponentVisibility, setUpdatePutawayLocationComponentVisibility }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const [activeLocation, setActiveLocation] = useState(null);
    const [options, setOptions] = useState([])
    const [putawayTableData, setPutawayTableData] = useState([])


    //Gets items for dropdown search bar
    useEffect(() => {
        fetch("https://localhost:7105/api/location/catalog")
            .then((response) => response.json())
            .then((object) => object.map(item => item.id.toString() + " - " + item.name))
            .then((options) => setOptions(options))
    }, []);

    useEffect(() => {
        if (activeLocation != null) {
            fetch("https://localhost:7105/api/putaway/location/" + activeLocation.substring(0, activeLocation.indexOf(' ')))
                .then((response) => response.json())
                .then((object) => setPutawayTableData(object))
        }
    }, [activeLocation]);

    //API GET for Product Catalog
    const locationData = useQuery({
        queryKey: [
            'location-data',
        ],
        queryFn: async () => {
            const fetchURL = new URL(
                '/api/location/catalog',
                'https://localhost:7105',
            );

            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        }
    });

    //if back-end table schema is changed, this will need to be updated
    const columns = useMemo(
        () => [
            {
                accessorKey: 'itemId',
                header: 'Item ID',
            },
            {
                accessorKey: 'quantityInLocation',
                header: 'Quantity',
            },
        ],
        [],
    );

    function getTableItem(option) {
        return locationData.data.find(item => item.id.toString() === option.substring(0, option.indexOf(' ')))
    }

    return (
        <Modal
            open={updatePutawayLocationComponentVisibility}
            onClose={() => setUpdatePutawayLocationComponentVisibility(false)}
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                padding: "0",
                m: "0",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ backgroundColor: "white", p: 3, minHeight: "60vh", minWidth: "40vw" }}>
                { /*Search Bar*/}
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", pb: 3, borderBottom: 1 }}>
                    <Autocomplete
                        sx={{ width: "40%" }}
                        autoComplete
                        options={Array.isArray(options) ? options : []}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Search Box" />
                        )}
                        onChange={(event, newValue) => {
                            setActiveLocation(newValue);
                        }}
                    />
                </Box>

                { /*Item Information */}
                {activeLocation && <Box sx={{ py: 2 }}>
                    <Typography variant="h2">
                        {getTableItem(activeLocation).name}
                    </Typography>
                </Box>}

                { /*Table*/}
                <Box sx={{ minHeight: "50vh" }}>
                {activeLocation && putawayTableData != [] && 
                    <MaterialReactTable
                        muiTableContainerProps={{ sx: { maxHeight: '45vh' } }}
                        columns={columns}
                        data={putawayTableData} //displays an empty table if no row data from API call

                        //Options
                        enableStickyHeader
                        enableRowActions

                        enableColumnActions={false}
                        enableBottomToolbar={false}
                        positionActionsColumn="last"

                        //Top Toolbar Buttons
                        renderTopToolbarCustomActions={({ table }) => (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {/*Add New Product Button*/}
                                <Tooltip arrow title="Add New Product">
                                    <Button
                                        style={{ backgroundColor: colors.addAccent[500] }}
                                        onClick={() => { console.log("implement functionality to pre-fill locationName & locationId, dropdown(for all items), and quantity field (in modal, submit should /api/putaway/add)") }}
                                        variant="contained"
                                    >
                                        + New Product
                                    </Button>
                                </Tooltip>
                            </div>
                        )}

                        //Buttons that appear on every row
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex' }} >
                                <IconButton
                                    onClick={() => console.log("Add: find a way to open nested modal and pass row (id: " + row.getValue('itemId')  + ") to the component")}
                                    sx={{ color: colors.addAccent[500] }}
                                    variant="contained"
                                >
                                    <Add />
                                </IconButton>
                                <IconButton
                                    onClick={() => console.log("Remove: find a way to open nested modal and pass row (id: " + row.getValue('itemId') + ") to the component")}
                                    sx={{ color: colors.removeAccent[500] }}
                                    variant="contained"
                                >
                                    <Remove />
                                </IconButton>
                            </Box>
                        )}
                        />
                    }
                </Box>

                { /*Buttons*/}
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", mt:2 }} >
                    <Button
                        onClick={() => setUpdatePutawayLocationComponentVisibility(null)}
                        sx={{ mx: 1 }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            console.log("Submitted " + activeLocation)

                        }}
                        sx={{ mx: 1, mt:2 }}
                        variant="contained"
                        disabled={activeLocation == null}
                    >
                        Submit
                    </Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default UpdatePutawayLocationComponent