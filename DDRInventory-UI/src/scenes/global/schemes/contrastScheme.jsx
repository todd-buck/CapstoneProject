const contrastScheme = (mode) => ({
    ...(mode === "dark"
        ? {
            gray: {
                100: "#FFFFFF",
                200: "#EEEEEE",
                300: "#CCCCCC",
                400: "#AAAAAA",
                500: "#888888",
                600: "#666666",
                700: "#444444",
                800: "#222222",
                900: "#000000"
            },
            primary: {
                100: "#000000",
                200: "#333333",
                300: "#666666",
                400: "#666666",
                500: "#666666",
                600: "#666666",
                700: "#666666",
                800: "#CCCCCC",
                900: "#FFFFFF"
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
                500: "#CD0000"
            }
        } : {
            gray: {
                100: "#000000",
                200: "#222222",
                300: "#444444",
                400: "#666666",
                500: "#888888",
                600: "#AAAAAA",
                700: "#CCCCCC",
                800: "#EEEEEE",
                900: "#FFFFFF"
            },
            primary: {
                100: "#FFFFFF",
                200: "#CCCCCC",
                300: "#666666",
                400: "#666666",
                500: "#666666",
                600: "#666666",
                700: "#666666",
                800: "#333333",
                900: "#000000"
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
                500: "#CD0000"
            }
        }
    )
});

export default contrastScheme;