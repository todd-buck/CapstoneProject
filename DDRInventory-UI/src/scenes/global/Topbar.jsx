import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link"
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import useMediaQuery from "@mui/material/useMediaQuery";

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
    const iconStyle = { color: colors.gray[100] }
    const isPhone = useMediaQuery('(max-width:600px)')

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{backgroundColor: colors.primary[200]}}>
            <Link
                href="/"
                underline="none"
            >
                <Typography
                    variant="logo_large"
                    color={colors.gray[100]}
                >
                    {isPhone ? "DDR" : "Dillard's Dining Resources"}

                </Typography>
            </Link>

            {/* Icons */}
            <Box display="flex">
                <Switch
                    onClick={colorMode.toggleColorMode}
                    icon={<LightModeOutlinedIcon sx={{ color: colors.gray[100], backgroundColor: colors.primary[400], borderRadius: '50%', p: "15%" }} /> }
                    checkedIcon={<DarkModeOutlinedIcon sx={{ color: colors.gray[100], backgroundColor: colors.primary[400], borderRadius: '50%', p:"10%" }} />}
                    sx={{
                        '& .MuiSwitch-switchBase': {
                            transitionDuration: '300ms',
                            '& + .MuiSwitch-track': {
                                    backgroundColor: colors.primary[700],
                                    opacity: 1,
                                },
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    backgroundColor: colors.primary[800],
                                    opacity: 1,
                                },
                                
                            },
                        }
                    }}>
                    
                </Switch>
            </Box>
        </Box>    
    )
}

export default Topbar;