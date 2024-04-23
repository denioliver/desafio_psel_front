import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MostRecent from './pages/MostRecent';
import Favorite from './pages/Favorite';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <MostRecent /> } />
        <Route path="/favorite" element={ <Favorite /> } />
      </Routes>
    </>
  );
}

export default App;
