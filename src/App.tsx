import { Route, Routes } from 'react-router-dom';
import './App.css';
import MostRecent from './pages/MostRecent';
import Favorite from './pages/Favorite';
import Unavailable from './pages/Unavailable';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <MostRecent /> } />
      <Route path="/favorite" element={ <Favorite /> } />
      <Route path="/release" element={ <Unavailable /> } />
      <Route path="/noticia" element={ <Unavailable /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
