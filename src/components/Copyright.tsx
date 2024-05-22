import { Stack, Typography } from "@mui/material";

function Copyright() {
    return (
        <Stack mb = {1} mt={3} sx={{width:"100%"}} alignItems="center">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="100px"></img>
            <Typography align="center" color="#4b4b51" fontSize="calc(7px + 1vmin)">
            © {new Date().getFullYear()} Irina Babkina & Aleksandra Lysachok. All Rights Reserved.
            </Typography>
        </Stack>
    )
}

export default Copyright

