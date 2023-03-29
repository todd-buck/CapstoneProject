import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard";

import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    const [mode, setMode] = useState("light");
    const [scheme, setScheme] = useState("default");

    const [theme, colorMode] = useMode(mode, setMode, scheme);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <QueryClientProvider client={queryClient}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Box sx={{ position: "fixed", zIndex: 100, height: "100vh" }}>
                            <Sidebar selected={selected} setSelected={setSelected} />
                        </Box>
                        <Box sx={{ width: "98vw", pl: 10 }}>
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