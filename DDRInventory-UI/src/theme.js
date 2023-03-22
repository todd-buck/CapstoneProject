import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            gray: {
                100: "#FAFAFA",
                200: "#cccccc",
                300: "#b3b3b3",
                400: "#999999",
                500: "#808080",
                600: "#666666",
                700: "#4d4d4d",
                800: "#333333",
                900: "#212121"
            },
            primary: {
                100: "#080808",
                200: "#181818",
                300: "#282828",
                400: "#383838",
                500: "#484848",
                600: "#585858",
                700: "#686868",
                800: "#787878",
                900: "#888888"
            },
            addAccent: {
                100: "#175D17",
                200: "#1E7C1E",
                300: "#269A26",
                400: "#2CB22C",
                500: "#33CC33",
                600: "#72DC72",
                700: "#A0E8A0",
                800: "#BFEFBF",
                900: "#E1F7E1"
            },
            removeAccent: {
                100: "#480000",
                200: "#700000",
                300: "#960000",
                400: "#B00000",
                500: "#CD0000",
                600: "#F20000",
                700: "#FF4747",
                800: "#FF7979",
                900: "#FFA3A3"
            },
            changeAccent: {
                100: "#00478E",
                200: "#0056AC",
                300: "#006DDA",
                400: "#0180FF",
                500: "#3399FF",
                600: "#65B2FF",
                700: "#9BCDFF",
                800: "#B9DCFF",
                900: "#D9ECFF"
            }
        } : {
            gray: { 
                100: "#212121",
                200: "#333333",
                300: "#4d4d4d",
                400: "#666666",
                500: "#808080",
                600: "#999999",
                700: "#b3b3b3",
                800: "#cccccc",
                900: "#FAFAFA"
            },
            primary: {
                100: "#F8F8F8",
                200: "#E8E8E8",
                300: "#D8D8D8",
                400: "#C8C8C8",
                500: "#B8B8B8",
                600: "#A8A8A8",
                700: "#989898",
                800: "#888888",
                900: "#787878"
            },
            addAccent: { 
                900: "#175D17",
                800: "#1E7C1E",
                700: "#269A26",
                600: "#2CB22C",
                500: "#33CC33",
                400: "#72DC72",
                300: "#A0E8A0",
                200: "#BFEFBF",
                100: "#E1F7E1"
            },
            removeAccent: {
                100: "#FFA3A3",
                200: "#FF7979",
                300: "#FF4747",
                400: "#F20000",
                500: "#CD0000",
                600: "#B00000",
                700: "#960000",
                800: "#700000",
                900: "#480000"
            },
            changeAccent: { 
                100: "#D9ECFF",
                200: "#B9DCFF",
                300: "#9BCDFF",
                400: "#65B2FF",
                500: "#3399FF",
                600: "#0180FF",
                700: "#006DDA",
                800: "#0056AC",
                900: "#00478E"
            }
        }
    )
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        main: colors.gray[100], // magenta
                    },
                    secondary: {
                        main: "#00FFFF", // cyan

                    },
                    neutral: {
                        dark: "#00FF00", // green
                        main: "#00FF00",
                        light: "#00FF00",
                    },
                    background: {
                        default: colors.primary[100], // violet
                    }
                } : {
                    primary: {
                        main: colors.gray[100], // magenta
                    },
                    secondary: {
                        main: "#00FFFF", // cyan

                    },
                    neutral: {
                        dark: "#00FF00", // green
                        main: "#00FF00",
                        light: "#00FF00",
                    },
                    background: {
                        default: colors.primary[100], // violet
                    }
                }),
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
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode];
};