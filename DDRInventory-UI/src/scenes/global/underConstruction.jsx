/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import useTheme from "@mui/material/styles/useTheme";

import { tokens } from "../../theme";

import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

const Error = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

            <HandymanOutlinedIcon sx={{ mt: "10vh", fontSize: "15vw" }} />

            <Typography
                variant="h4"
                color={colors.gray[100]}
                sx={{ mr: "20vw", ml: "20vw", mt: "2vh", textAlign: 'center' }}
            >
                <h1>Pardon Our Progress</h1>
                <h5>This component is currently under development by our team. Check back soon as we continue to release updates to the Dillard's Dining Resources Inventory Management System.</h5>
            </Typography>

        </Box>
    )
}

export default Error;