import { useMemo, useState } from 'react'
import MaterialReactTable from 'material-react-table';

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import useTheme from "@mui/material/styles/useTheme";

/* MUI ICONS*/
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ModeIcon from '@mui/icons-material/Mode';
import InfoIcon from '@mui/icons-material/Info';

import {
    useQuery, useMutation
} from '@tanstack/react-query';

import { tokens } from "../../theme";

/* POPUP COMPONENTS */
import AddNewProductComponent from "./addnewproduct.jsx"
import UpdateInventoryComponent from "./updateinventory.jsx"
import UpdatePutawayItemComponent from "./updateputawayitem.jsx"

const DashboardComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const [addNewProductComponentVisibility, setAddNewProductComponentVisibility] = useState(null);
    const [updateInventoryComponentVisibility, setUpdateInventoryComponentVisibility] = useState(null);
    const [updatePutawayItemComponentVisibility, setUpdatePutawayItemComponentVisibility] = useState(null);

    //API GET for Product Catalog
    const { data, isFetchError, isFetching, refetch } = useQuery({
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

    //API DELETE for Product Catalog Item
    const deleteItem = useMutation({
        mutationFn: (itemId) => {
            fetch("https://localhost:7105/api/item/delete/" + itemId.toString(), {
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
                header: 'Id',
            },
            {
                accessorKey: 'name',
                header: 'Name',
                enableSorting:true,
            },
            {
                accessorKey: 'quantityOnHand',
                header: 'Quantity',
            },
            {
                accessorKey: 'price',
                header: 'Price',
            },
            {
                accessorKey: 'unit',
                header: 'Unit',
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'subCategory',
                header: 'Subcategory',
            },
            {
                accessorKey: 'parLevel',
                header: 'Par Level',
            },
        ],
        [],
    );

    return (
        <Box>
            {addNewProductComponentVisibility ? (<AddNewProductComponent addNewProductComponentVisibility={addNewProductComponentVisibility} setAddNewProductComponentVisibility={setAddNewProductComponentVisibility} refetch={refetch} />) : null}
            {updateInventoryComponentVisibility ? (<UpdateInventoryComponent item={updateInventoryComponentVisibility.original} setUpdateInventoryComponentVisibility={setUpdateInventoryComponentVisibility} refetch={refetch} />) : null}
            {updatePutawayItemComponentVisibility ? (<UpdatePutawayItemComponent updatePutawayItemComponentVisibility={updatePutawayItemComponentVisibility} setUpdatePutawayItemComponentVisibility={setUpdatePutawayItemComponentVisibility} row={updatePutawayItemComponentVisibility.original} refetch={refetch} />) : null}

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
                enableRowSelection
                enableMultiRowSelection
                enableRowActions
                positionActionsColumn="last"

                //Error Messages
                muiToolbarAlertBannerProps={
                    isFetchError ? {color: 'error', children: 'Error loading data.'} : {}
                }

                //Top Toolbar Buttons
                renderTopToolbarCustomActions={({ table }) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {/*Add New Product Button*/}
                        <Tooltip arrow title="Add New Product">
                            <Button
                                sx={{ backgroundColor: colors.addAccent[600] }}
                                onClick={() => {setAddNewProductComponentVisibility(true);}} 
                                variant="contained"
                            >
                                + New Product
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
                        {/*Item Info Button*/}
                        <IconButton
                            onClick={() => {
                                setUpdatePutawayItemComponentVisibility(row)
                            }}
                            sx={{
                                "&:hover": {
                                    color: colors.changeAccent[500]
                                }
                            }}
                        >
                            <InfoIcon />
                        </IconButton>

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

                        {/*Edit Button*/}
                        <IconButton
                            onClick={() => {
                                setUpdateInventoryComponentVisibility(row);
                            }}
                            sx={{
                                "&:hover": {
                                    color: colors.changeAccent[500]
                                }
                            }}
                        >
                            <ModeIcon />
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

export default DashboardComponent;
