import React, { useMemo, useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Autocomplete, Box, Button, IconButton, Modal, Tooltip, TextField, Typography, useTheme } from '@mui/material';
import { Add, Remove, DisabledByDefault } from '@mui/icons-material';
import {
    useQuery,
} from '@tanstack/react-query';
import { tokens } from "../../theme";

//TODO:
//  Code Search Bar Button onClick
//  Call API/Fill Item Information Box based on select (if this is not an option, do it based on search button in search bar)
//  console.log("Remove: find a way to open nested modal and pass row (id: " + row.getValue('itemId') + ") to the component")
//  console.log("Add: find a way to open nested modal and pass row (id: " + row.getValue('itemId')  + ") to the component")

const UpdatePutawayLocationComponent = ({ updatePutawayLocationComponentVisibility, setUpdatePutawayLocationComponentVisibility }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    // This is for the dropdown in the top right corner of the modal
    const [activeLocation, setActiveLocation] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    //This is the list of locations in the dropdown box
    const [locationOptions, setLocationOptions] = useState([])
    const [itemOptions, setItemOptions] = useState([])

    //This is the data rows for the table that appears when an item is selected from the dropdown
    const [putawayTableData, setPutawayTableData] = useState([])
    const [putawayTableTrigger, setPutawayTableTrigger] = useState(false)

    /* These state variables are modified by the + / - buttons in the putaway table.
    When set by the onClick function in renderRowActions, they will set the state 
    value to the current row making the modal visible */
    const [addModalObject, setAddModalObject] = useState(null)
    const [removeModalObject, setRemoveModalObject] = useState(null)
    const [updateModalObject, setUpdateModalObject] = useState(null)

    //used in addModal and removeModal
    const [quantityBuffer, setQuantityBuffer] = useState(0)

    //Gets locations for dropdown search bar (this doesn't need to be here, declare const object that remaps locationData')
    useEffect(() => {
        fetch("https://localhost:7105/api/location/catalog")
            .then((response) => response.json())
            .then((object) => object.map(item => item.id.toString() + " - " + item.name))
            .then((locationOptions) => setLocationOptions(locationOptions))
    }, []);

    //Gets locations for dropdown search bar (this doesn't need to be here, declare const object that remaps locationData')
    useEffect(() => {
        fetch("https://localhost:7105/api/item/catalog")
            .then((response) => response.json())
            .then((object) => object.map(item => item.id.toString() + " - " + item.name))
            .then((itemOptions) => setItemOptions(itemOptions))
    }, []);

    //Gets items in specified dropdown-selected location 
    useEffect(() => {
        if (activeLocation != null) {
            fetch("https://localhost:7105/api/putaway/location/" + activeLocation.substring(0, activeLocation.indexOf(' ')))
                .then((response) => response.json())
                .then((object) => setPutawayTableData(object))
        }
    }, [activeLocation, putawayTableTrigger]);

    //Gets list of all locations (might be useful to take this up a level)
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

    //Gets list of all items (might be useful to take this up a level)
    const itemData = useQuery({
        queryKey: [
            'item-data',
        ],
        queryFn: async () => {
            const fetchURL = new URL(
                '/api/item/catalog',
                'https://localhost:7105',
            );

            const response = await fetch(fetchURL.href);
            const json = await response.json();
            return json;
        }
    });

    //this is a hardcoded list of columns for the table of items for a dropdown-selected location
    const columns = useMemo(
        () => [
            {
                accessorKey: 'itemId',
                header: 'Item ID',
            },
            {
                accessorKey: 'itemName',
                header: 'Item Name',
            },
            {
                accessorKey: 'quantityInLocation',
                header: 'Quantity',
            },
        ],
        [],
    );

    //gets a single location object from the list of locations in locationData
    function getTableItem(option) {
        const item = locationData.data.find(item => item.id.toString() === option.substring(0, option.indexOf(' ')))
        return item
    }

    return (
        <Box>
            {addModalObject ? (addModal(colors, addModalObject, setAddModalObject, quantityBuffer, setQuantityBuffer, putawayTableTrigger, setPutawayTableTrigger)) : null}
            {removeModalObject ? (removeModal(colors, removeModalObject, setRemoveModalObject, quantityBuffer, setQuantityBuffer, putawayTableTrigger, setPutawayTableTrigger)) : null}
            {updateModalObject ? (updateModal(colors, activeItem, setActiveItem, itemData, updateModalObject, setUpdateModalObject, putawayTableTrigger, setPutawayTableTrigger, itemOptions, quantityBuffer, setQuantityBuffer)) : null}

            <Modal
                open={updatePutawayLocationComponentVisibility != null}
                onClose={() => setUpdatePutawayLocationComponentVisibility(false)}
                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ backgroundColor: colors.primary[100], p: 3, minHeight: "60vh", minWidth: "40vw" }}>
                    { /*Dropdown for locations*/}
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", pb: 3, borderBottom: 1 }}>
                        <Autocomplete
                            sx={{ width: "40%" }}
                            autoComplete
                            options={Array.isArray(locationOptions) ? locationOptions : []}
                            renderInput={(data) => (
                                <TextField {...data} variant="outlined" label="Locations" />
                            )}
                            onChange={(event, newValue) => {
                                setActiveLocation(newValue);
                            }}
                        />
                        <IconButton
                            onClick={() => setUpdatePutawayLocationComponentVisibility(null)}
                            variant="contained"
                            sx={{ color: colors.primary[900] }}
                        >
                            <DisabledByDefault />
                        </IconButton>
                    </Box>

                    { /*Location Information */}
                    {activeLocation && <Box sx={{ py: 2 }}>
                        <Typography variant="h2">
                            {getTableItem(activeLocation).name}
                        </Typography>
                    </Box>}

                    { /*Table*/}
                    <Box sx={{ minHeight: "50vh" }}>
                    {activeLocation && 
                        <MaterialReactTable
                            muiTableContainerProps={{ sx: { maxHeight: '45vh' } }}
                            muiTableBodyProps={{
                                sx: {
                                    //stripe the rows, make odd rows a darker color
                                    '& tr:nth-of-type(odd)': {
                                        backgroundColor: colors.primary[200],
                                    },
                                    '& tr:hover td': {
                                        backgroundColor: colors.primary[300],
                                    },
                                },
                            }}
                            columns={columns}
                            data={putawayTableData} //displays an empty table if no row data from API call

                            //Options
                            enableStickyHeader
                            enableRowActions
                            enablePagination={false}

                            enableColumnActions={false}
                            enableBottomToolbar={false}
                            positionActionsColumn="last"

                            //Top Toolbar Buttons
                            renderTopToolbarCustomActions={({ table }) => (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {/*Add New Product Button*/}
                                    <Tooltip arrow title="Add New Product">
                                        <Button
                                            style={{ backgroundColor: colors.addAccent[600] }}
                                            onClick={() => {
                                                setUpdateModalObject({
                                                    itemId: null,
                                                    locationId: getTableItem(activeLocation).id,
                                                    itemName: null,
                                                    locationName: getTableItem(activeLocation).name,
                                                    quantityInLocation: null
                                                })
                                            }}
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
                                        onClick={() => setAddModalObject(row)}
                                        sx={{ color: colors.addAccent[700] }}
                                        variant="contained"
                                    >
                                        <Add />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setRemoveModalObject(row)}
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
                </Box>
            </Modal>
        </Box>
    )
}

const addModal = (colors, addModalObject, setAddModalObject, quantityBuffer, setQuantityBuffer, putawayTableTrigger, setPutawayTableTrigger) => {

    return (
        <Modal
            open={addModalObject != null}
            onClose={() => setAddModalObject(null)}
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ backgroundColor: colors.primary[100], p: 2, minWidth: "20vw" }}>
                <Box sx={{mb: 2, borderBottom: 1} }>
                    <Typography variant="h3" sx={{mb: 1}}>
                        Item {addModalObject.original.itemId}:
                    </Typography>

                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", pl:2, pr:6, pt:1 }}>
                    <Typography variant="h6">
                        Quantity
                    </Typography>
                    <Typography variant="h6">
                        Addition
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px:3 }}>
                    <Typography variant="h4">
                        {addModalObject.original.quantityInLocation}
                    </Typography>
                    <Typography variant="h4">
                        +
                    </Typography>
                    <TextField
                        error={quantityBuffer < 0}
                        value={quantityBuffer}
                        onChange={(event) => setQuantityBuffer(Number(event.target.value))}
                        type="number"
                        size='small'
                        sx={{width: '33%'} }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>

                { /*Buttons*/}
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", mt: 4 }} >
                    <Button
                        onClick={() => {
                            setQuantityBuffer(0)
                            setAddModalObject(null)
                        }}
                        sx={{
                            backgroundColor: colors.changeAccent[500],
                            mx: 1
                        }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: colors.addAccent[500],
                            mx: 1
                        }}
                        onClick={() => {
                            addModalObject.original.quantityInLocation = addModalObject.original.quantityInLocation + quantityBuffer
                            fetch("https://localhost:7105/api/putaway/add", {
                                accept: 'application/json',
                                method: 'POST',
                                mode: 'cors',
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(addModalObject.original)
                            }).then(() => setQuantityBuffer(0))
                                .then(() => setAddModalObject(null))
                                .then(() => setPutawayTableTrigger(!putawayTableTrigger))
                        }}
                       
                        variant="contained"
                        disabled={quantityBuffer <= 0}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>    
    )
}

const removeModal = (colors, removeModalObject, setRemoveModalObject, quantityBuffer, setQuantityBuffer, putawayTableTrigger, setPutawayTableTrigger) => {

    return (
        <Modal
            open={removeModalObject != null}
            onClose={() => setRemoveModalObject(null)}
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ backgroundColor: colors.primary[100], p: 2, minWidth: "20vw" }}>
                <Box sx={{mb: 2, borderBottom: 1} }>
                    <Typography variant="h3" sx={{mb: 1} }>
                        Item {removeModalObject.original.itemId}:
                    </Typography>

                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", pl: 2, pr: 5, pt: 1 }}>
                    <Typography variant="h6">
                        Quantity
                    </Typography>
                    <Typography variant="h6">
                        Reduction
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3 }}>
                    <Typography variant="h4">
                        {removeModalObject.original.quantityInLocation}
                    </Typography>
                    <Typography variant="h4">
                        -
                    </Typography>
                    <TextField
                        error={ quantityBuffer < 0}
                        value={quantityBuffer}
                        onChange={(event) => setQuantityBuffer(Number(event.target.value))}
                        type="number"
                        size='small'
                        sx={{ width: '33%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>

                { /*Buttons*/}
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", mt: 4 }} >
                    <Button
                        onClick={() => {
                            setQuantityBuffer(0)
                            setRemoveModalObject(null)
                        }}
                        sx={{
                            backgroundColor: colors.changeAccent[500],
                            mx: 1
                        }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (removeModalObject.original.quantityInLocation - quantityBuffer >= 0) {
                                removeModalObject.original.quantityInLocation = removeModalObject.original.quantityInLocation - quantityBuffer
                            } else {
                                removeModalObject.original.quantityInLocation = 0
                            }
                            fetch("https://localhost:7105/api/putaway/add", {
                                accept: 'application/json',
                                method: 'POST',
                                mode: 'cors',
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(removeModalObject.original)
                            }).then(() => setQuantityBuffer(0))
                                .then(() => setRemoveModalObject(null))
                                .then(() => setPutawayTableTrigger(!putawayTableTrigger))
                        }}
                        sx={{ mx: 1 }}
                        variant="contained"
                        disabled={quantityBuffer <= 0}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

const updateModal = (colors, activeItem, setActiveItem, itemData, updateModalObject, setUpdateModalObject, putawayTableTrigger, setPutawayTableTrigger, itemOptions, quantityBuffer, setQuantityBuffer) => {
    //gets a single location object from the list of locations in locationData
    function getItem(option) {
        const item = itemData.data.find(item => item.id.toString() === option.substring(0, option.indexOf(' ')))
        return item
    }

    return (
        <Box>
            <Modal
                open={updateModalObject != null}
                onClose={() => {
                    setActiveItem(null)
                    setQuantityBuffer(0)
                    setUpdateModalObject(null)
                }}

                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ backgroundColor: colors.primary[100], p: 2, minHeight: "20vh", minWidth: "20vw" }}>
                    <Box sx={{ borderBottom: 1, mb: 2 }}>
                        <Typography variant="h3">
                            Add to {updateModalObject.locationName}:
                        </Typography>
                    </Box>
                    <Autocomplete
                        sx={{ width: "100%", mb: 3 }}
                        autoComplete
                        options={Array.isArray(itemOptions) ? itemOptions : []}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Items" />
                        )}
                        onChange={(event, newValue) => {
                            setActiveItem(newValue);
                        }}
                    />
                    <Box sx={{ width: '33%', mt: 3, mr: 1, mb: 1 }}>
                        <TextField
                            error={quantityBuffer < 0}
                            value={quantityBuffer}
                            label="Quantity"
                            autoFocus
                            disabled={!activeItem}
                            onChange={(event) => setQuantityBuffer(Number(event.target.value))}
                            type="number"
                        />
                    </Box>
                    { /*Buttons*/}
                    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", mt: 2 }} >
                        <Button
                            onClick={() => {
                                setActiveItem(null)
                                setQuantityBuffer(0)
                                setUpdateModalObject(null)
                            }}
                            sx={{ mx: 1 }}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                updateModalObject.itemName = getItem(activeItem).name
                                updateModalObject.itemId = getItem(activeItem).id
                                updateModalObject.quantityInLocation = quantityBuffer

                                fetch("https://localhost:7105/api/putaway/add", {
                                    accept: 'application/json',
                                    method: 'POST',
                                    mode: 'cors',
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify(updateModalObject)
                                }).then(() => setQuantityBuffer(0))
                                    .then(() => setActiveItem(null))
                                    .then(() => setUpdateModalObject(null))
                                    .then(() => setPutawayTableTrigger(!putawayTableTrigger))
                            }}
                            sx={{ mx: 1 }}
                            variant="contained"
                            disabled={quantityBuffer < 0 || !activeItem}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}



export default UpdatePutawayLocationComponent