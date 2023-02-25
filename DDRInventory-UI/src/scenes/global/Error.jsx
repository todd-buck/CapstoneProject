import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const Error = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

        <WarningAmberOutlinedIcon sx={{ mt: "10vh", fontSize: "15vw"}} />

        <Typography
            variant="h4"
            color={colors.gray[100]}
            sx={{ mr: "20vw", ml: "20vw", mt: "2vh", textAlign: 'center' }}
        >
            An error occured. Please contact the admin team or check the log for details.
        </Typography>

        </Box>
    )
}

export default Error;