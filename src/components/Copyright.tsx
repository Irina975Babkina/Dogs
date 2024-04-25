import { Box, Typography } from "@mui/material";

function Copyright() {
    return (
        <Box mt={3} sx={{width:"100%", paddingBottom: "1.5rem", paddingTop:{xs: "1rem", sm: "2rem", md: "3rem"}}}>
            <Typography align="center" color="#4b4b51" fontSize="calc(7px + 1vmin)">
            © {new Date().getFullYear()} Irina Babkina & Aleksandra Lysachok. All Rights Reserved.
            </Typography>
        </Box>
    )
}

export default Copyright

