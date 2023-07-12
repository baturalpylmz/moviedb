import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage' 
import MovieDetail from './Pages/MovieDetails'
import { Route, Routes } from 'react-router-dom';
import Trends from './Pages/Trends';
import Recommendations from './Pages/Recommendations';
import List from './Pages/List';
import Categories from './Pages/Categories';
import FilterPage from './Pages/FilterPage';


const App:React.FC =()=> {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/moviedetail/:id' element={<MovieDetail/>} />
      <Route path='/trends/:time' element={<Trends/>} />
      <Route path='/recommendations/:id' element={<Recommendations/>} />
      <Route path='/list/:typeOfList' element={<List/>} />
      <Route path='/category/:id' element={<Categories/>}/>
      <Route path='/filtered' element={<FilterPage/>}/>
    </Routes>
  );
}

export default App;
