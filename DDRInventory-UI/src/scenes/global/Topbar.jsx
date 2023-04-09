import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link"
import Typography from '@mui/material/Typography';

import useTheme from "@mui/material/styles/useTheme";

/* MUI ICONS */
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);
    const colorMode = useContext(ColorModeContext);
    const iconStyle = {color: colors.gray[100]}


    return (
        <Box display="flex" justifyContent="space-between" p={2} sx={{backgroundColor: colors.primary[200]}}>
            <Link
                href="/"
                underline="none"
            >
                <Typography
                    variant="logo_large"
                    color={colors.gray[100]}
                >
                    Dillard's Dining Resources
                </Typography>
            </Link>

            {/* Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}
                    style={iconStyle}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon style={iconStyle} />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon style={iconStyle} />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon style={iconStyle} />
                </IconButton>
            </Box>
        </Box>    
    )
}

export default Topbar;