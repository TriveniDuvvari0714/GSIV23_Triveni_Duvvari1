import '../App.css'
import 'primeicons/primeicons.css';
import {useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const BACKDROP_SIZE = 'w200';


function List(moviesdata) {

 const navigate = useNavigate();

 const [movies, setmovies] = useState([moviesdata.moviesdata]);
 const [search, setSearch] = useState('');

  
 
 const searchSubmit = (e) => {
  e.preventDefault();
  const searchMovies = movies[0].filter((movie) => movie.title === search);
        setmovies([searchMovies]);
  };

 const backHome = () => {
  setmovies([moviesdata.moviesdata]);
  setSearch('');
 }

   return (
      <div>
        <Navbar className="bg-body-tertiary">
        <Container>
        <div>
          <span>
          <form onSubmit={searchSubmit}>
         <input type="search" onChange = {(e) => setSearch(e.target.value)} value = {search} placeholder="Search..."/>
         <button type="submit" >Search</button>
       </form>
         <i className="pi pi-home rating" onClick={backHome}></i>
          </span>
        

        </div>
        </Container>
      </Navbar>
       
       
       
      
       { movies[0].map((ele) => {
         return (
          <div class="card" onClick={() => navigate("/Details/"+ele.id)}>
                   <img src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                ele.backdrop_path
              }`} className ="card-img-top" />
                   <div className="card-body">
                   <p> <h5 className="card-title">{ele.title}  <span className='rating'>{ele.vote_average}</span>   </h5>  </p>
                     <p className="card-text">{ele.overview.substring(0,50).trim()}....</p>
                   </div>
                 </div> 
         );
       } 
       )}
     </div>
    );
  }
  
  export default List;