import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cats from './components/Cats';
import Dogs from './components/Dogs';
import Home from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/cats" element={<Cats />} /> 
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;