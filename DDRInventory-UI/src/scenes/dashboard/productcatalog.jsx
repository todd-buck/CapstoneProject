import React, { useState, useEffect, useCallback } from 'react'
import MaterialReactTable from 'material-react-table';

import { Box, IconButton, useTheme, Button } from "@mui/material";
import { Delete, Mode } from '@mui/icons-material';

import { tokens } from "../../theme";

const DashboardComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [productCatalog, setProductCatalog] = useState(null)

    useEffect(() => {
        const base_url = "https://localhost:3000";

        const getData = async (api_method) => {
            try {
                const response = await fetch(base_url + api_method);
                const responseData = await response.json()
                setProductCatalog(responseData)
            } catch (error) {
                console.error(error);
            }
        };

        getData("/api/catalog");
    }, []);

    const handleDeleteRow = useCallback(
        (row) => {
            if (!window.confirm(`Are you sure you want to delete ${row.getValue('name')}?`)) {
                return;
            }
            console.log("Entering fetch post")
            console.log(JSON.stringify({ id: 1 }))
            const test = 1;

            fetch("https://localhost:7105/api/delete?id=" + test.toString(), {
                method: 'DELETE',
                mode: 'cors',
            }).then((response) => response.status)
                .then((responseStatus) => {
                    if (responseStatus != 200) {
                        console.log("Exiting fetch post with error. Response: " + responseStatus.toString())
                        window.location.reload()
                    }
                    console.log("Exiting fetch post without error. Response: " + responseStatus.toString())
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
            renderRowActions={({ row }) => (
                <Box sx={{ display: 'flex', flexDirextion: 'row' }} >
                    <IconButton
                        onClick={() => handleDeleteRow(row)}
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        onClick={() => alert('Implement UpdateItem')}
                    >
                        <Mode />
                    </IconButton>
                </Box>
            )}
            initialState={{ showColumnFilters: false }}
            renderTopToolbarCustomActions={({ table }) => {
                const handleAddNewItem = () => {
                    alert('Implement AddNewItem');
                };

                return (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            color="success"
                            onClick={handleAddNewItem}
                            variant="contained"
                        >
                            + New Item
                        </Button>
                    </div>
                );
            }}

        />
    )
}

export default DashboardComponent;
