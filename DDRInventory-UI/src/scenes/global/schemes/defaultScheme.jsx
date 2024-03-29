const defaultScheme = (mode) => ({
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
            },
            splashAccent: {
                400: "#0E004F",
                500: "#363C94"
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
                100: "#E1F7E1",
                200: "#BFEFBF",
                300: "#A0E8A0",
                400: "#72DC72",
                500: "#33CC33",
                600: "#2CB22C",
                700: "#269A26",
                800: "#1E7C1E",
                900: "#175D17"
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
                400: "#A6B7FF",
                500: "#6D8AFF"
            }
        }
    )
});

export default defaultScheme;