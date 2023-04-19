import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import Box from "@mui/material/Box";
import logo from '../../assets/BreezeLogo.png';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog popup
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                
                <Box mt="25px">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={logo}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                </Box>
                <BootstrapDialogTitle align="center" fontSize="4rem" id="customized-dialog-title" onClose={handleClose}>
                    <Box
                        sx={{
                            color: 'black',
                            fontSize: '56px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '3px'
                        }}
                    >
                        Welcome to Breeze!
                    </Box>

                    
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom align="center">
                        Please feel free to interact with our product, view our product portfolio, and check out our source code GitHub.
                    </Typography>
                    
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Ready to Go!  
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}