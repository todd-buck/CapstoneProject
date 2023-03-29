import { createContext, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

//Schemes
import contrastScheme from "./scenes/global/schemes/contrastScheme"
import daisyScheme from "./scenes/global/schemes/daisyScheme"
import desertScheme from "./scenes/global/schemes/desertScheme"
import flamingoScheme from "./scenes/global/schemes/flamingoScheme"
import seaScheme from "./scenes/global/schemes/seaScheme"
import defaultScheme from "./scenes/global/schemes/defaultScheme"


// A function called "tokens" that takes the mode and scheme as parameters.

// This is used at the beginning of each component:
// const colors = tokens(theme.palette.mode);
// parameters changed from previous

export const tokens = (mode, scheme) => {
    switch (scheme) {
        case "contrast":
            return contrastScheme(mode)
        case "daisy":
            return daisyScheme(mode)
        case "desert":
            return desertScheme(mode)
        case "flamingo":
            return flamingoScheme(mode)
        case "sea":
            return seaScheme(mode)

        default:
            return defaultScheme(mode)
    }
    
}

// MUI theme settings, is a function called "ThemeSettings"
// that takes the current mode and current scheme as parameters.
// THIS IS ONLY USED WITHIN THEME.JS!
// parameters changed from previously, changes made to update all function calls

export const themeSettings = (mode, scheme) => {
    const colors = tokens(mode, scheme);

    return {
        colors: colors,
        palette: {
            mode: mode,
            scheme: scheme,
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,

            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
            logo_large: {
                fontFamily: ["Damion", "sans-serif"].join(","),
                fontSize: 40,
            },
            logo_medium: {
                fontFamily: ["Damion", "sans-serif"].join(","),
                fontSize: 24,
            },
            logo_small: {
                fontFamily: ["Damion", "sans-serif"].join(","),
                fontSize: 16,
            },
        },
    };
};

// context for color mode
// used in topbar.js to toggle different icons based on light/dark mode

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    
});

export const useMode = (mode, setMode, scheme) => {

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode, scheme)), [mode, scheme])

    return [theme, colorMode];
};