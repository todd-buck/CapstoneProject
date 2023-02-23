import React, { useState, useEffect } from 'react'

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    
    const [inventoryCatalogList, setInventoryCatalogList] = useState(null)

    useEffect(() => {
        getInventoryCatalog()
    }, [])

    const getInventoryCatalog = () => {
        fetch("https://localhost:3000/api/catalog")
            .then(res => res.json())
            .then(
                (result) => {
                    setInventoryCatalogList(result)
                },
                (error) => {
                    setInventoryCatalogList(null)
                }
            )
    }


    if (!inventoryCatalogList) return (<div>No Data Found.</div>)
    
    return (
        <TableContainer background={colors.primary[500]}>
            <h1 style={{paddingLeft: "10px"}}>Inventory Catalog</h1>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Quantity On Hand</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Unit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventoryCatalogList.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.quantityOnHand}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">{row.unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Dashboard;