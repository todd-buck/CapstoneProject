import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard";

import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';


function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Box sx={{position: "fixed", zIndex: 100, height: "100vh"} }>
                        <Sidebar isSidebar={isSidebar} selected={selected} setSelected={setSelected} />
                    </Box>

                    <Box sx={{width: "98vw", pl: 10} }>
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar} />
                            <Routes>
                                <Route path="/" element={<Dashboard selected={selected} />} />
                            </Routes>
                        </main>
                    </Box>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;