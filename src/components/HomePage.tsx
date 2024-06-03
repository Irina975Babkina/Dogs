import { Card, CardActionArea, CardMedia, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Copyright from './Copyright';
import Header from './Header';
function Home() {
  const rootStyle = {
    width: '100%',
    //height: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
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
    color: '#4B4B51'
  };
  return (
    <Stack sx={rootStyle}>
        <Header/>
        <Stack sx={stackStyle}>
            <Card sx={{ ...cardStyle, backgroundColor: "#7BA0B0" }}>
                <NavLink to="/cats">
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        src={process.env.PUBLIC_URL + '/cat.png'}
                        style={{  width: '110%', height: '110%', objectFit: "contain"}}
                        alt={"Cat"}
                        />
                    </CardActionArea>
              </NavLink>
              <Typography sx={cardTypographyStyle}>Click on cat if you are cat lover</Typography>
            </Card>
            <Card sx={{ ...cardStyle, backgroundColor: "#CAB8B4" }}>
                <NavLink to="/dogs">
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        src={process.env.PUBLIC_URL + '/dog.png'}
                        style={{ minWidth: '100%', height: '100%', objectFit: "contain"}}
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