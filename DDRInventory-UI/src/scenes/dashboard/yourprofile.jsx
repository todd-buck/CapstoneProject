/* MUI COMPONENTS */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import useTheme from "@mui/material/styles/useTheme";

import profilePicture from '../../assets/StockProfilePicture.jpg';

import { tokens } from "../../theme";

const YourProfileComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);
    const emailAddress = "margarethamilton@dillardsdiningresources.com";
    const phoneNumber = "1800-867-5309";
    const loggedin = false;

    if (loggedin) return (
        <div>
            <Typography variant="h1" sx={{p:2}}>
                Your Profile
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: colors.primary[400], p: 3}}>
                <Avatar src={profilePicture} alt="Profile Picture" sx={{
                    width: '200px',
                    height: '200px',
                    border: `5px solid ${colors.primary[100]}`
                }} />
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h1" sx={{ mb: 1 }}>
                        Margaret Hamilton
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                        Software Engineer
                    </Typography>
                    <Typography variant="p" sx={{ mb: 1 }}>
                        <div>
                            <b>Email: </b>{emailAddress}
                        </div>
                        <div>
                            <b>Phone: </b>{phoneNumber}
                        </div>
                    </Typography>
                </Box>
            </Box>
            <Button variant="contained" sx={{
                ml: 2, mt: 2,
                backgroundColor: colors.changeAccent[400],
                ':hover': { backgroundColor: colors.changeAccent[600] }
            }}>
                Edit Profile
            </Button>
            <Button variant="contained" sx={{
                ml: 2, mt: 2,
                backgroundColor: colors.addAccent[400],
                ':hover': { backgroundColor: colors.addAccent[600] }
            }}>
                Log Out
            </Button>
        </div>
    );

    return (
        <div>
            <Typography variant="h1" sx={{ p: 2 }}>
                Account Login
            </Typography>
            <Box sx={{ maxWidth:'450px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <TextField
                    label="Username"
                />
                <TextField
                    label="Password"
                    type="password"
                />
                <Button variant="contained" sx={{
                    backgroundColor: colors.addAccent[400],
                    ':hover': { backgroundColor: colors.addAccent[600] }
                }}>
                    Login
                </Button>
            </Box>
        </div>
    );
};

export default YourProfileComponent;
