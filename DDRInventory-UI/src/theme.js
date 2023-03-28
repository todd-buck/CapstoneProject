import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { SettingsComponent } from './scenes/dashboard/settings';

// REVISION V2

// color design tokens, THIS IS FINE.
// A function called "tokens" that takes the mode and scheme as parameters.

// This is used at the beginning of each component:
// const colors = tokens(theme.palette.mode);
// parameters changed from previous

export const tokens = (mode, scheme) => {
    if (mode === "dark" && scheme === "default") {
        return {
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
            },
            splashAccent: {
                100: "#332100",
                200: "#664200",
                300: "#996300",
                400: "#cc8400",
                500: "#ffa500",
                600: "#ffb733",
                700: "#ffc966",
                800: "#ffdb99",
                900: "#ffedcc"
            }
        }
    }
    else if (mode === "light" && scheme === "default") {
        return {
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
            },
            splashAccent: {
                100: "#ffedcc",
                200: "#ffdb99",
                300: "#ffc966",
                400: "#ffb733",
                500: "#ffa500",
                600: "#cc8400",
                700: "#996300",
                800: "#664200",
                900: "#332100"
            }
        }
    }
    else if (mode === "light" && scheme === "contrast") {
        return {
            // insert contrast hex codes
        }
    }
    else if (mode === "dark" && scheme === "contrast") {
        return {
            // insert contrast hex codes
        }
    }
    else if (mode === "light" && scheme === "flamingo") {
        return {
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
                100: "#fcdfd1",
                200: "#f9bfa3",
                300: "#f6a074",
                400: "#f38046",
                500: "#f06018",
                600: "#c04d13",
                700: "#903a0e",
                800: "#60260a",
                900: "#301305"
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
            },
            splashAccent: {
                100: "#332100",
                200: "#664200",
                300: "#996300",
                400: "#cc8400",
                500: "#ffa500",
                600: "#ffb733",
                700: "#ffc966",
                800: "#ffdb99",
                900: "#ffedcc"
            }
        }
    }
    else if (mode === "dark" && scheme === "flamingo") {
        return {
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
                100: "#fadde6",
                200: "#f5bbcc",
                300: "#f198b3",
                400: "#ec7699",
                500: "#e75480",
                600: "#b94366",
                700: "#8b324d",
                800: "#5c2233",
                900: "#2e111a"
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
            },
            splashAccent: {
                100: "#332100",
                200: "#664200",
                300: "#996300",
                400: "#cc8400",
                500: "#ffa500",
                600: "#ffb733",
                700: "#ffc966",
                800: "#ffdb99",
                900: "#ffedcc"
            }
        }
    }
    else if (mode === "light" && scheme === "desert") {
        return {
            // insert desert hex codes
        }
    }
    else if (mode === "dark" && scheme === "desert") {
        return {
            // insert desert hex codes
        }
    }
    else if (mode === "light" && scheme === "sea") {
        return {
            // insert sea hex codes
        }
    }
    else if (mode === "dark" && scheme === "sea") {
        return {
            // insert sea hex codes
        }
    }
    else if (mode === "light" && scheme === "daisy") {
        return {
            // insert daisy hex codes
        }
    }
    else if (mode === "dark" && scheme === "daisy") {
        return {
            // insert daisy hex codes
        }
    }
};

// MUI theme settings, is a function called "ThemeSettings"
// that takes the current mode and current scheme as parameters.
// THIS IS ONLY USED WITHIN THEME.JS!
// parameters changed from previously, changes made to update all function calls

export const themeSettings = (mode, scheme) => {
    const colors = tokens(mode, scheme);

    return {
        palette: {
            mode: mode,
            scheme: scheme,
            primary: {
                main: colors.gray[100], // neutral
            },
            secondary: {
                main: "#00FFFF", // cyan

            },
            neutral: {
                dark: "#00FF00", // green
                main: "#00FF00", // green
                light: "#00FF00", // green
            },
            background: {
                default: colors.primary[100], // neutral
            }
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
// const colorMode = useContext(ColorModeContext);

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    toggleColorScheme: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("light");
    const [scheme, setScheme] = useState("default");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const colorScheme = useMemo(
        () => ({
            toggleColorScheme: () =>
                setScheme(SettingsComponent.selectedScheme),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode, scheme)), [{ mode, scheme }])

    return [theme, colorMode];
};