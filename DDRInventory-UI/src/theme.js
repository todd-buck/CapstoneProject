import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            gray: { // Reddish gray
                100: "#f9f6f6",
                200: "#f3edec",
                300: "#eee4e3",
                400: "#e8dbd9",
                500: "#e2d2d0",
                600: "#b5a8a6",
                700: "#887e7d",
                800: "#5a5453",
                900: "#2d2a2a"
            },
            primary: { // Reddish black
                100: "#d1cfcf",
                200: "#a3a09f",
                300: "#767070",
                400: "#484140",
                500: "#1a1110",
                600: "#150e0d",
                700: "#100a0a",
                800: "#0a0706",
                900: "#050303"
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
            redAccent: { // Dillard's Red
                100: "#f8d7d9",
                200: "#f0afb4",
                300: "#e9878e",
                400: "#e15f69",
                500: "#da3743",
                600: "#ae2c36",
                700: "#832128",
                800: "#57161b",
                900: "#2c0b0d"
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
                900: "#f8d7d9",
                800: "#f0afb4",
                700: "#e9878e",
                600: "#e15f69",
                500: "#da3743",
                400: "#ae2c36",
                300: "#832128",
                200: "#57161b",
                100: "#2c0b0d"
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