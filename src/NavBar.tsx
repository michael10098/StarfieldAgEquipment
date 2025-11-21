import { AppBar, Toolbar, Typography, CircularProgress, Box } from "@mui/material";
import { useDataStore } from "./DataStoreProvider";
import { lighten } from '@mui/material/styles';

interface NavBarProps {
    height?: number;
}

export default function NavBar({
    height = 16
}: NavBarProps) {
    const navHeight = Math.max(height, 16);

    const {
        isLoading
    } = useDataStore();

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 3,
                backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.5),
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    width: "100%",
                    px: 2,
                    height: `${navHeight * 4}px`,
                    minHeight: `${navHeight * 4}px`,
                }}
            >
                {/* Left */}
                <Box
                    component="img"
                    sx={{
                        height: '100%',
                        width: 'auto',
                    }}
                    src="../public/logo.svg"
                    alt="Starfiel AG"
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="body1"
                        sx={{
                            ml:2, 
                            fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
                            fontWeight: 'bold',
                            color: 'black',
                            userSelect: 'none',
                        }}
                    >
                        Farm Customers
                    </Typography>

                    {(isLoading) && (
                        <CircularProgress size={24} sx={{ ml: 2, color: "black" }} />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}