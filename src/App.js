
import './App.css';
import {  BrowserRouter as Router , Routes , Route  } from 'react-router-dom';
import Header from './components/Header'; 
import BottomNavigationAction from './components/Header/MainNav' ;
import { Container } from '@mui/material';

import Trending from './Pages/Trending/Trending.js';
import Series from './Pages/Series/Series.js';
import Search from './Pages/Search/Search.js';
import Movies from './Pages/Movies/Movies.js'

function App() {
  return (
    <Router>
    <Header />
    <div className="App">
      <Container>
        <Routes>
          <Route path='/' element={<Trending />} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/series' element={<Series/>} />
          <Route path='/search' element={<Search/>} />
        </Routes>
      </Container>
    </div>
    <BottomNavigationAction />
    </Router>
  );
}

export default App;
