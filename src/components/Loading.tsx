import { Stack, Typography } from "@mui/material";
import LinearBuffer from "./LoadingProgress";


function Loding() {
    return (
        <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="100px"></img>
            <Typography variant="h5" color='#4b4b51' padding="2rem">Loading</Typography>
            <LinearBuffer />
        </Stack>
    )
}

export default Loding

