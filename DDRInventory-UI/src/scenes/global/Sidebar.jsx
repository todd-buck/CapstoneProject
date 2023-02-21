import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

/*Menu Collapse Icon*/
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

/*Inventory Catalog Icon*/
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

/*Add Inventory Icon*/
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

/*Add New Item Icon*/
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

/*Reports Icon*/
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

/*Your Profile Icon*/
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

/*Add New Users Icon*/
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

/*Documentation Icon*/
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

/*FAQs Icon*/
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.gray[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
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
                            margin: "10px 0 20px 0",
                            color: colors.gray[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.gray[100]}>
                                    DDRInventory
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
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
                                    src={`../../assets/logo512.png`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.gray[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Todd Buck
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Front-End Dev
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* Home Screen (Inventory Catalog) */}
                        <Item
                            title="Inventory Catalog"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Inventory Manipulation (Add New Item)*/}
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
                            title="Add Inventory (Invoices)"
                            to="/"
                            icon={<PostAddOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Add New Item"
                            to="/"
                            icon={<AddBoxOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Reports"
                            to="/"
                            icon={<AssessmentOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
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
                        />
                        <Item
                            title="Add New Users"
                            to="/"
                            icon={<PersonAddAltOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

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
                        />
                        <Item
                            title="FAQs"
                            to="/"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;