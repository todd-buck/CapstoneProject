import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            gray: { // gray
                100: "#e6e6e6",
                200: "#cccccc",
                300: "#b3b3b3",
                400: "#999999",
                500: "#808080",
                600: "#666666",
                700: "#4d4d4d",
                800: "#333333",
                900: "#1a1a1a"
            },
            primary: { // black
                100: "#d1d1d1",
                200: "#a3a3a3",
                300: "#747674",
                400: "#464846",
                500: "#181a18",
                600: "#131513",
                700: "#0e100e",
                800: "#0a0a0a",
                900: "#050505"
            },
            greenAccent: { // same as original
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            redAccent: { // Dillard's Screaming Red
                100: "#fbcdcd",
                200: "#f79c9c",
                300: "#f36a6a",
                400: "#ef3939",
                500: "#eb0707",
                600: "#bc0606",
                700: "#8d0404",
                800: "#5e0303",
                900: "#2f0101"
            },
            blueAccent: { // same as original
                100: "#e1e6fe",
                200: "#c2ccfd",
                300: "#a4b3fc",
                400: "#8599fb",
                500: "#6780fa",
                600: "#5266c8",
                700: "#3e4d96",
                800: "#293364",
                900: "#151a32"
            }
        } : {
            gray: { // same as original
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                400: "#525252",
                800: "#c2c2c2",
                900: "#e0e0e0"
            },
            primary: { // same as original
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5"
            },
            greenAccent: { // same as original
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee"
            },
            redAccent: { // Dillard's Red
                900: "#fbcdcd",
                800: "#f79c9c",
                700: "#f36a6a",
                600: "#ef3939",
                500: "#eb0707",
                400: "#bc0606",
                300: "#8d0404",
                200: "#5e0303",
                100: "#2f0101"
            },
            blueAccent: { // same as original
                100: "#151a32",
                200: "#293364",
                300: "#3e4d96",
                400: "#5266c8",
                500: "#6780fa",
                600: "#8599fb",
                700: "#a4b3fc",
                800: "#c2ccfd",
                900: "#e1e6fe"
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
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.redAccent[500],

                    },
                    neutral: {
                        dark: colors.gray[700],
                        main: colors.gray[500],
                        light: colors.gray[100],
                    },
                    background: {
                        default: colors.primary[500],
                    }
                } : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.redAccent[500],

                    },
                    neutral: {
                        dark: colors.gray[700],
                        main: colors.gray[500],
                        light: colors.gray[100],
                    },
                    background: {
                        default: "#fcfcfc",
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
    const [mode, setMode] = useState("dark");

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