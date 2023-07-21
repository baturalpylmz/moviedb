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
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import Favourites from './Pages/Favourites';
import { useAuth } from './Context/AuthContext';
import ErrorPage from './Pages/ErrorPage';


const App:React.FC =()=> {

  const {user}  = useAuth()

  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/moviedetail/:id' element={<MovieDetail/>} />
      <Route path='/trends/:time' element={<Trends/>} />
      <Route path='/recommendations/:id' element={<Recommendations/>} />
      <Route path='/list/:typeOfList' element={<List/>} />
      <Route path='/category/:id' element={<Categories/>}/>
      <Route path='/filtered' element={<FilterPage/>}/>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/sign-up' element={<SignUpPage/>} />
      <Route path='/favourites' element={ user ? <Favourites/> : <ErrorPage/> } />
    </Routes>
  );
}

export default App;
