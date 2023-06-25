import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage' 
import MovieDetail from './Pages/MovieDetails'
import { Route, Routes } from 'react-router-dom';
import Trends from './Pages/Trends';


const App:React.FC =()=> {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/moviedetail/:id' element={<MovieDetail/>} />
      <Route path='/trends/:time' element={<Trends/>} />
    </Routes>
  );
}

export default App;
