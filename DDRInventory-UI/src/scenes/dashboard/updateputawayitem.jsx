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

const UpdatePutawayItemComponent = ({ updatePutawayItemComponentVisibility, setUpdatePutawayItemComponentVisibility }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const [activeItem, setActiveItem] = useState(null);
    const [options, setOptions] = useState([])
    const [putawayTableData, setPutawayTableData] = useState([])
    

    //Gets items for dropdown search bar
    useEffect(() => {
        fetch("https://localhost:7105/api/item/catalog")
            .then((response) => response.json())
            .then((object) => object.map(item => item.id.toString() + " - " + item.name))
            .then((options) => setOptions(options))
    }, []);

    useEffect(() => {
        if (activeItem != null) {
        fetch("https://localhost:7105/api/putaway/item/" + activeItem.substring(0, activeItem.indexOf(' ')))
            .then((response) => response.json())
            .then((object) => setPutawayTableData(object))
        }
    }, [activeItem]);

    //API GET for Product Catalog
    const tableData = useQuery({
        queryKey: [
            'table-data',
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

    //if back-end table schema is changed, this will need to be updated
    const columns = useMemo(
        () => [
            {
                accessorKey: 'locationName',
                header: 'Location Name',
            },
            {
                accessorKey: 'quantityInLocation',
                header: 'Quantity',
            },
        ],
        [],
    );

    function getTableItem(option) {
        return tableData.data.find(item => item.id === option.substring(0, option.indexOf(' ')))
    }

    return (
        <Modal
            open={updatePutawayItemComponentVisibility}
            onClose={() => setUpdatePutawayItemComponentVisibility(null)}
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                }}
        >
            <Box sx={{ position: "relative", backgroundColor: "white", p: 3, minHeight: "60vh", minWidth: "40vw"}}>
                { /*Search Bar*/ }
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", pb: 3, borderBottom: 1}}>
                    <Autocomplete
                        sx={{ width: "40%" }}
                        autoComplete
                        options={Array.isArray(options) ? options : []}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Search Box" />
                        )}
                        onChange={(event, newValue) => {
                            setActiveItem(newValue);
                        }}
                    />
                </Box>

                { /*Item Information */ }
                {activeItem && <Box sx={{ py: 2 }}>
                    <Typography variant="h2">
                        {getTableItem(activeItem).name}
                    </Typography>
                    <Typography variant="h4">
                        {getTableItem(activeItem).category}, {getTableItem(activeItem).subCategory}
                    </Typography>
                </Box>}

                { /*Table*/ }
                {activeItem && putawayTableData != [] && <Box>
                    <MaterialReactTable
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
                                        onClick={() => {}}
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
                                    onClick={() => console.log("Add: find a way to open nested modal and pass row to the component")}
                                    sx={{ color: colors.addAccent[500] }}
                                    variant="contained"
                                >
                                    <Add />
                                </IconButton>
                                <IconButton
                                    onClick={() => console.log("Remove: find a way to open nested modal and pass row to the component")}
                                    sx={{ color: colors.removeAccent[500] }}
                                    variant="contained"
                                >
                                    <Remove />
                                </IconButton>
                            </Box>
                        )}
                    />
                </Box>}

                { /*Buttons*/}
                <Box sx={{ position: "absolute", bottom: 0, right: 0, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", p: 2 }} >
                    <Button
                        onClick={() => setUpdatePutawayItemComponentVisibility(null)}
                        sx={{ p: 1, mb: 1, mx: 1 }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            console.log("Submitted " + activeItem)
                            
                        }}
                        sx={{ p: 1, mb: 1, mx: 1 }}
                        variant="contained"
                        disabled={activeItem == null}
                    >
                        Submit
                    </Button>
                </Box>

            </Box>
        </Modal>
    )

}

export default UpdatePutawayItemComponent