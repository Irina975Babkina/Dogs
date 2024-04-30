import { Button, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const ErrorPage = () => (
  <Container>
    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="100px"></img>
    <Typography gutterBottom variant="h1">
      404
    </Typography>
    <Typography gutterBottom variant="h4">
      Page Not Found
    </Typography>
    <Typography paragraph variant="body1">
      We are sorry, but the page you were looking for does not exist.
    </Typography>
    <Button color="primary" component={Link} to="/" variant="contained">
      Go Home
    </Button>
  </Container>
)

export default ErrorPage
