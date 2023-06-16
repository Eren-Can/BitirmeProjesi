import { useTheme } from "@mui/material";

const useChangeColor = () => {

    const theme = useTheme();

    return (color: any, darkCode: number) => {
        const code = theme.palette.mode === "dark" ? darkCode : 1000 - darkCode;
        return color[code];
    }
}

export default useChangeColor;