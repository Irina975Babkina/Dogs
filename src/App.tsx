import { Stack } from '@mui/material';
import MainBlock from './components/MainBlock';

function App() {
  return (
    <Stack m={{xs: "1rem", sm: "1.5rem", md: "2rem"}} justifyContent="center" alignItems="center">
     <h1>Сute dogs</h1>
      <MainBlock/> 
    </Stack>
  );
}

export default App;
