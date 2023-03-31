import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useContext } from "react";
import { Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from "../../theme";
import { Select, MenuItem } from '@mui/material';
import { Box } from '../../../node_modules/@mui/material/index';
import { Button } from '@mui/material';
import UpdatePutawayItemComponent from "./updateputawayitem.jsx";

const PutAwayManagerComponent = ({ scheme, setScheme }) => {
    const [updatePutawayItemComponentVisibility, setUpdatePutawayItemComponentVisibility] = useState(false);


    const AddByItem = () => {
        const [showAddByItemSearchbar, setShowByItemSearchBar] = useState(null);
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Button
                    onClick={() => setShowByItemSearchBar(prev => !prev)}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Add By Item
                </Button>
                {showAddByItemSearchbar && <Box>
                    <Autocomplete
                        autoComplete
                        //options={myOptions}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Search Box" />
                        )}
                    />
                </Box>}
            </Box>
        );
    }

    const RemoveByItem = () => {
        const [showRemoveByItemSearchbar, setShowByItemSearchBar] = useState(false);
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Button
                    onClick={() => setShowByItemSearchBar(prev => !prev)}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Remove By Item
                </Button>
                {showRemoveByItemSearchbar && <Box>
                    <Autocomplete
                        autoComplete
                        //options={myOptions}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Search Box" />
                        )}
                    />
                </Box>}
            </Box>
        );
    }

    const AddByLocation = () => {
        const [showAddByLocationSearchbar, setShowByLocationSearchBar] = useState(false);
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Button
                    onClick={() => setShowByLocationSearchBar(prev => !prev)}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Add By Location
                </Button>
                {showAddByLocationSearchbar && <Box>
                    <Autocomplete
                        autoComplete
                        //options={myOptions}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Search Box" />
                        )}
                    />
                </Box>}
            </Box>
        );
    }

    const RemoveByLocation = () => {
        const [showRemoveByLocationSearchbar, setShowByLocationSearchBar] = useState(false);
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Button
                    onClick={() => {
                        setShowByLocationSearchBar(prev => !prev)
                    }}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Remove By Location
                </Button>
                {showRemoveByLocationSearchbar && <Box>
                    <Autocomplete
                        autoComplete
                        //options={myOptions}
                        renderInput={(data) => (
                            <TextField {...data} variant="outlined" label="Search Box" />
                        )}
                    />
                </Box>}
            </Box>
        );
    }

    return (
        <Box>
            {updatePutawayItemComponentVisibility ? (<UpdatePutawayItemComponent updatePutawayItemComponentVisibility={updatePutawayItemComponentVisibility} setUpdatePutawayItemComponentVisibility={setUpdatePutawayItemComponentVisibility} />) : null}

            <Typography variant="h1" sx={{p:2}}>
                Put Away Manager
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', juatifyContent: 'flex-start', alignItems: 'flex-start' }}>

                <AddByItem />

                <RemoveByItem />

                <AddByLocation />

                <RemoveByLocation />

                
                <Button
                    onClick={() => {
                        setUpdatePutawayItemComponentVisibility(true)
                    }}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Modal Test
                </Button>
            </Box>
        </Box>
    );
}

export default PutAwayManagerComponent;