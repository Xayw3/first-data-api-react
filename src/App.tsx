import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import EpisodesPage from './pages/EpisodesPage/EpisodesPage';
import EpisodePage from './pages/EpisodePage/EpisodePage';
import Page404 from './pages/Page404/Page404';
import LocationsPage from './pages/LocationsPage/LocationsPage';

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:id" element={<EpisodePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </div>
);

export default App;
