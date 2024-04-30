import { Stack } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cats from './components/Cats';
import Dogs from './components/Dogs';
import ErrorPage from './components/ErrorPage';
import Home from './components/HomePage';

const mainContainerStyle = {
  paddingLeft: {xs:"1rem", sm: "2rem", md:"4rem"},
  paddingRight: {xs:"1rem", sm: "2rem", md:"4rem"},
};

function App() {
  return (
    <Router>
      <Stack sx={mainContainerStyle}>
        <Routes> 
          <Route path="/cats" element={<Cats />} /> 
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/" element={<Home />} /> 
          <Route path="*" element={<ErrorPage />}  />
        </Routes>
      </Stack>
    </Router>
  );
}

export default App;