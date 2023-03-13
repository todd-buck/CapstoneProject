import React, { useState, useEffect, useCallback } from 'react'
import MaterialReactTable from 'material-react-table';

import { Box, IconButton, useTheme, Button } from "@mui/material";
import { Delete, Mode } from '@mui/icons-material';

import { tokens } from "../../theme";

import UpdateInventoryComponent from "./updateinventory.jsx"

import AddNewProductComponent from "./addnewproduct.jsx"

const DashboardComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [productCatalog, setProductCatalog] = useState(null)

    const [updateInventoryWindow, setUpdateInventoryWindow] = useState(false);

    const [addProductWindow, setAddProductWindow] = useState(false);

    useEffect(() => {
        const base_url = "https://localhost:7105";

        const getData = async (api_method) => {
            try {
                const response = await fetch(base_url + api_method);
                const responseData = await response.json()
                setProductCatalog(responseData)
            } catch (error) {
                console.error(error);
            }
        };

        getData("/api/item/catalog");
    }, []);

    const handleDeleteRow = useCallback(
        (row) => {
            if (!window.confirm(`Are you sure you want to delete ${row.getValue('name')}?`)) {
                return;
            }

            fetch("https://localhost:7105/api/item/delete/" + row.getValue('id').toString(), {
                method: 'DELETE',
                mode: 'cors',
            }).then((response) => response.status)
                .then((responseStatus) => {
                    if (responseStatus != 200) {
                        window.location.reload()
                    }
                })
            //update local table
            productCatalog.splice(row.index, 1);
            setProductCatalog([...productCatalog]);
        },
        [productCatalog],
    );

    if (!productCatalog) return (<div>Loading...</div>)

    const stableColumns = Object.keys(productCatalog[0]).map(key => {
        const capitalize = key.toLocaleUpperCase()
        return { accessorKey: key, header: capitalize }
    })

    return (
        <Box>
            {updateInventoryWindow ? (
                <UpdateInventoryComponent item={updateInventoryWindow.original} setUpdateInventoryWindow={setUpdateInventoryWindow} productCatalog={productCatalog} setProductCatalog={setProductCatalog} />
            ) : (
                null
            )}

            {addProductWindow ? (
                <AddNewProductComponent setAddProductWindow={setAddProductWindow} productCatalog={productCatalog} setProductCatalog={setProductCatalog} />
            ) : (
                null
            )}
        
        <MaterialReactTable
            columns={stableColumns}
            data={productCatalog}
            enableColumnFilterModes
            enableColumnOrdering
            enableColumnGrouping
            enableGrouping
            enableRowActions
            enableStickyHeader
            enableStickyFooter
            positionActionsColumn="last"
            muiTableContainerProps={{
                sx: {
                        maxHeight: '70vh',
                    }
            }}
            renderRowActions={({ row }) => (
                <Box sx={{ display: 'flex', flexDirextion: 'row' }} >
                    <IconButton
                        onClick={() => handleDeleteRow(row)}
                        sx={{ "&:hover": { color: colors.redAccent[500] } }}
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        onClick={() => {setUpdateInventoryWindow(row);}}
                        sx={{ "&:hover": { color: colors.blueAccent[500] } }}
                    >
                        <Mode />
                    </IconButton>
                </Box>
            )}
            initialState={{ showColumnFilters: false }}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            style={{ backgroundColor: colors.greenAccent[500]}}
                            onClick={() => {setAddProductWindow(true);}} 
                            variant="contained"
                        >
                            + New Item
                        </Button>
                    </div>
                );
            }}

            />
        </Box>
    )
}

export default DashboardComponent;
