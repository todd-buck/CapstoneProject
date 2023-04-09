import { useState } from 'react';

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

/* POPUP COMPONENTS */
import UpdatePutawayItemComponent from "./updateputawayitem.jsx";
import UpdatePutawayLocationComponent from "./updateputawaylocation.jsx";

const PutAwayManagerComponent = () => {
    const [updatePutawayItemComponentVisibility, setUpdatePutawayItemComponentVisibility] = useState(false);
    const [updatePutawayLocationComponentVisibility, setUpdatePutawayLocationComponentVisibility] = useState(false);
/*    const AddByItem = () => {
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
*/
    return (
        <Box>
            {updatePutawayItemComponentVisibility ? (<UpdatePutawayItemComponent updatePutawayItemComponentVisibility={updatePutawayItemComponentVisibility} setUpdatePutawayItemComponentVisibility={setUpdatePutawayItemComponentVisibility} />) : null}
            {updatePutawayLocationComponentVisibility ? (<UpdatePutawayLocationComponent updatePutawayLocationComponentVisibility={updatePutawayLocationComponentVisibility} setUpdatePutawayLocationComponentVisibility={setUpdatePutawayLocationComponentVisibility} />) : null}

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                <Button
                    onClick={() => {
                        setUpdatePutawayItemComponentVisibility(true)
                    }}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Find By Item
                </Button>

                <Button
                    onClick={() => {
                        setUpdatePutawayLocationComponentVisibility(true)
                    }}
                    sx={{ p: 1, mb: 1, mx: 1 }}
                    variant="contained"
                >
                    Find By Location
                </Button>
            </Box>
        </Box>
    );
}

export default PutAwayManagerComponent;
