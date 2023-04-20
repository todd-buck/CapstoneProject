import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';
import logo from '../../assets/BreezeLogo.png';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box align="center" sx={style}>
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
                        <Typography id="transition-modal-description" fontSize="1.0rem" sx={{ mt: 2 }}>
                            Please feel free to interact with our product, view our <Link href="https://capstoneproject.app/" target="_blank">product portfolio</Link>, and check out our source code <Link href="https://github.com/todd-buck/CapstoneProject" target="_blank">GitHub</Link>.
                        </Typography>
                        <Box align="right" >
                            <Button onClick={handleClose}>Ready to Go!</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}