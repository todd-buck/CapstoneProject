import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import logo from '../../assets/DillardsLogoV2.png'

/*Menu Collapse Icon*/
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

/*Dashboard Icon*/
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

/*Dashboard Icon*/
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";

/*Add Inventory Icon*/
//import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

/*Add New Item Icon*/
//import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

/*Reports Icon*/
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

/*CSV Import Icon*/
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

/*Location Manager Icon*/
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';

/*Put Away Manager Icon*/
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';

/*Settings Icon*/
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

/*Your Profile Icon*/
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

/*Add New Users Icon*/
//import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

/*Documentation Icon*/
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

/*FAQs Icon*/
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { ManageSearchOutlined, NotListedLocationOutlined } from "../../../node_modules/@mui/icons-material/index";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed, setIsCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);
    return (
        <MenuItem
            active={selected === title}
            sx={{
                color: colors.gray[100],
                //marginRight: "20px",
                //padding: "5px 0px 5px 20px !important",
                //margin: "0px 10px 0px 135px",
            }}
            onClick={() => {
                setSelected(title)
                setIsCollapsed(!isCollapsed)
            }
            }
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};


const Sidebar = ({selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <Box
            sx={{
                //height: "150vh",
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[300]} !important`,
                    height: "100vh",
                    //position: 'fixed',   
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 0px 5px 20px !important",
                    margin: "0px 15px 0px 0px",
                },
                "& .pro-inner-item:not(active):hover": {
                    fontWeight: 'bold !important',
                    //padding: "5px 0px 5px 20px !important",
                    //margin: "0px 10px 0px 135px",
                    color: `${colors.gray[100]} !important`,
                    //backgroundColor: `${colors.splashAccent[0]} !important`,
                    transition: 'background-color 0.3s ease-in-out',
                },
                "& .pro-menu-item.active": {
                    color: `${colors.gray[100]} !important`,
                    backgroundColor: `${colors.splashAccent[500]} !important`,
                    transition: 'background-color 0.3s ease-in-out',
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            color: colors.gray[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                                ml="15px"

                                
                            >
                                <IconButton sx={{ "&:hover": { backgroundColor: colors.splashAccent[100] } }} onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
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
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"} marginRight="0vw">
                        {!isCollapsed && (
                            <Typography
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Home
                            </Typography>
                        )}

                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<GridViewOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={ setIsCollapsed} 
                        />

                        {!isCollapsed && (
                            <Typography
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Inventory
                            </Typography>
                        )}

                        <Item
                            title="Product Catalog"
                            to="/"
                            icon={<DvrOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            sx={{ m: "0px 0 0px 0px" }}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />

                       {/* <Item
                            title="Update Inventory"
                            to="/"
                            icon={<PostAddOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Add New Product"
                            to="/"
                            icon={<AddBoxOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />*/}
                        <Item
                            title="Reports"
                            to="/"
                            icon={<AssessmentOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />
                        <Item
                            title="Import CSV"
                            to="/"
                            icon={<UploadFileOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />

                        <Item
                            title="Location Manager"
                            to="/"
                            icon={<NotListedLocationOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                            sx={{ m: "0px 0 0px 0px" }}
                        />

                        <Item
                            title="Put Away Manager"
                            to="/"
                            icon={<ManageSearchOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                            sx={{ m: "0px 0 0px 0px" }}
                        />

                        <Item
                            title="Settings"
                            to="/"
                            icon={<SettingsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />

                        {/* Pages/User Manipulation*/}
                        {!isCollapsed && (
                            <Typography
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Users
                            </Typography>
                        )}
                        <Item
                            title="Your Profile"
                            to="/"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />
                        {/*<Item
                            title="Add New Users"
                            to="/"
                            icon={<PersonAddAltOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />*/}

                        {/* Information */}
                        {!isCollapsed && (
                            <Typography
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Information
                            </Typography>
                        )}
                        <Item
                            title="Documentation"
                            to="/"
                            icon={<MenuBookOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />
                        <Item
                            title="FAQs"
                            to="/"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;