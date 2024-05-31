import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const typographyStyle = {
    fontSize: 'calc(16px + 5vmin)',
    color: '#4b4b51',
    textAlign: 'center',
  };

function Header() {
    return (
        <Stack flexDirection="column" justifyContent="center" alignItems="center">
            <NavLink to="/">
                <img src={process.env.PUBLIC_URL + '/home.png'} alt="home" width="150px"></img>   
            </NavLink>
            <Typography sx={typographyStyle}>...pick your pet online</Typography>
        </Stack>
    ) 
}

export default Header

