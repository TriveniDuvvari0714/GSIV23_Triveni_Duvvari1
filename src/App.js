import React from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from './config';
import List from "./components/List";
import Details from "./components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const movieDetails = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=52c7447070718a0d326feefed5a2bd7d');
const movieTmdb = await movieDetails.json();



function App() {
    return ( <Router>
      <Routes>
          <Route path = "/" element = {<List moviesdata={movieTmdb.results} />} /> 
          <Route path="/Details/:id" element = { <Details /> } />
     </Routes> 
    </Router>
        );
    }
    

    export default App;