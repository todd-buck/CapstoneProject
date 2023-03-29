import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard";

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';


function App() {
    const [mode, setMode] = useState("light");
    const [scheme, setScheme] = useState("default");

    const [theme, colorMode] = useMode(mode, setMode, scheme);
    const [selected, setSelected] = useState("Dashboard");

    return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Sidebar selected={selected} setSelected={setSelected} />
                        <main className="content">
                            <Topbar />
                            <Routes>
                                <Route path="/" element={<Dashboard selected={selected} scheme={scheme} setScheme={setScheme} />} />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
    )
}

export default App;