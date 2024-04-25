import { Card, CardActionArea, CardMedia, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Copyright from './Copyright';

function Home() {
  const rootStyle = {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden'
  };

  const typographyStyle = {
    fontSize: 'calc(16px + 6vmin)',
    color: '#4b4b51',
    m: '2rem'
  };

  const stackStyle = {
    flexDirection: { xs: "column", sm: "row", md: "row" },
    justifyContent: { xs: "center", sm: "space-between" },
    alignItems: 'center',
    height: 'calc(100% - 4rem)'
  };

  const cardStyle = {
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const cardTypographyStyle = {
    fontSize: 'calc(8px + 3vmin)',
    color: '#4b4b51'
  };

  return (
    <Stack sx={rootStyle}>
        <Stack flexDirection="column" alignContent="center">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="150px"></img>
            <Typography sx={typographyStyle}>...pick your pet online</Typography>
        </Stack>
        <Stack sx={stackStyle}>
            <Card sx={{ ...cardStyle, backgroundColor: "#7ba0b0" }}>
                <NavLink to="/cats">
                    <CardActionArea>                    
                        <CardMedia
                        component="img"
                        src={process.env.PUBLIC_URL + '/cat.png'}
                        style={{ width: '100%', maxHeight: '350px', objectFit: 'contain', marginTop: "2rem"}}
                        alt={"Cat"}
                        />
                    </CardActionArea>
              </NavLink>
              <Typography sx={cardTypographyStyle}>Click on cat if you are cat lover</Typography>
            </Card>
            <Card sx={{ ...cardStyle, backgroundColor: "#cab8b4" }}>
                <NavLink to="/dogs">
                    <CardActionArea>                    
                        <CardMedia
                        component="img"
                        src={process.env.PUBLIC_URL + '/dog.png'}
                        style={{ width: '100%', maxHeight: '350px', objectFit: 'contain', marginTop: "2rem"}}
                        alt={"Dog"}
                        />
                    </CardActionArea>
                </NavLink>
            <Typography sx={cardTypographyStyle}>Click on dog if you are dog lover</Typography>
            </Card>
        </Stack>
        <Copyright/>
    </Stack>
  );
}

export default Home;