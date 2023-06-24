import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage' 
import MovieDetail from './Pages/MovieDetails'
import { Route, Routes } from 'react-router-dom';


const App:React.FC =()=> {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/moviedetail/:id' element={<MovieDetail/>} />
    </Routes>
  );
}

export default App;
