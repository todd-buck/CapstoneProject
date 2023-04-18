import { useState } from 'react';
import UnderConstructionComponent from '../global/underConstruction.jsx'
import { Box, Button, FormControl, Typography } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import useTheme from "@mui/material/styles/useTheme";
import { tokens } from "../../theme";

import { target_URL } from "../../App.js"
const isFinished = true;


const ImportCSVComponent = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    // eslint-disable-next-line
    const [file, setFile] = useState()
    const [fileSelected, setFileSelected] = useState(false);


    function handleChange(event) {
        setFile(event.target.files[0])
        setFileSelected(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        fetch(target_URL + "/api/item/uploadCSV", {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then((response) => response.status)
            .then((responseStatus) => {
                if (responseStatus === 451) {
                    console.log("Item not found. Response: " + responseStatus.toString())
                }
                else {
                    console.log("Exiting fetch post without error. Response: " + responseStatus.toString())
                    //window.location.reload()
                }
            })
    }

    if (isFinished) {

        return (
            <Box
                sx={{
                    margin: '20px',
                }}
            >
                <Typography variant="h1" sx={{ marginBottom: '20px' }}>
                    Upload CSV
                </Typography>
                <FormControl onSubmit={handleSubmit}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={fileSelected ?
                            <InsertDriveFileIcon />
                            : < CloudUploadIcon />
                        }
                        sx={{
                            width: '300px',
                            height: '200px',
                            color: colors.gray[100],
                            fontSize: '20px',
                            backgroundColor: colors.primary[200],
                            '&:hover': {
                                backgroundColor: colors.primary[300],
                            },
                        }}
                    >
                        {fileSelected ? file.name : 'Choose file'}
                        <input
                            id="file-input"
                            type="file"
                            accept=".csv"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                    </Button>
                    <Button type="submit" sx={{
                        marginTop: '10px',
                        color: colors.gray[100],
                        backgroundColor: colors.addAccent[300],
                        '&:hover': {
                            backgroundColor: colors.addAccent[500],
                        },
                    }} color="success" onclick="handleSubmit(file)">
                        Upload
                    </Button>
                </FormControl>
            </Box>
        );


    } else {
        return (
            <UnderConstructionComponent />
        );
    }


}
 
export default ImportCSVComponent;
