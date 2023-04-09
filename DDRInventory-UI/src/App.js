import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

/* USER BUILT COMPONENTS */
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

/* MUI COMPONENTS */
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { ColorModeContext, useMode, tokens } from './theme';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

/* FOR CONNECTING TO BACK-END SERVER, SHOULD BE CHANGED PER DEVICE (FOR DEPLOYMENT) */
const target_IPv4 = "192.168.1.181"
//const target_IPv4 = "localhost"
const target_port = ":7105"
export const target_URL = "https://" + target_IPv4 + target_port

function App() {
    const [mode, setMode] = useState("light");
    const [scheme, setScheme] = useState("default");

    const [theme, colorMode] = useMode(mode, setMode, scheme);
    const [selected, setSelected] = useState("Dashboard");

    const colors = tokens(mode, scheme);

    return (
        <QueryClientProvider client={queryClient}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Box sx={{ position: "fixed", zIndex: 100, height: "100vh" }}>
                            <Sidebar selected={selected} setSelected={setSelected} />
                        </Box>
                        <Box sx={{ position: 'absolute', pb: 40, top: 0, left:0, minHeight: "100vh", width: "100vw", pl: 10, backgroundColor: colors.primary[100] }}>
                            <main className="content">
                                <Topbar />
                                <Routes>
                                    <Route path="/" element={<Dashboard selected={selected} scheme={scheme} setScheme={setScheme} />} />
                                </Routes>
                            </main>
                        </Box>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </QueryClientProvider>
    )
}

export default App;