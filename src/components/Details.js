import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_KEY} from '../config';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const BACKDROP_SIZE = 'w300';

function Details() {

    const { id } = useParams();

    const [movieinfo, setmovieinfo] = useState([]);
    const [cast, setcast] = useState();
    const [director, setDirector] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(async() => {
                const movie = await fetch(`${API_URL}movie/` + id + `?api_key=${API_KEY}`);
                const movieDetail = await movie.json();
                setmovieinfo(movieDetail);
                const moviecast = await fetch(`${API_URL}movie/` + id + `/credits?api_key=${API_KEY}`);
                const moviecastDetails = await moviecast.json();
                setcast(moviecastDetails);
            },
            10);
    }, []);

    if (cast) {
        setTimeout(() => {
            const directorinfo = cast.crew.filter((c) => c.job === 'Director');
            setDirector(directorinfo[0].name);
        }, 10);
    }
    return (

        <div>
          <div>
             <Navbar className = "bg-body-tertiary">
               <Container>
                 <Navbar.Brand className = 'title'><h2> Movie Details </h2></Navbar.Brand>
                <i className = "pi pi-home rating" onClick = {() => navigate("/")} > </i> 
               </Container> 
             </Navbar>
          </div>
          <div className = "card1 mb-3">        
             <div className = "row g-0" >        
               <div className = "col-md-4" >
                  <img src = { `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieinfo.backdrop_path}`} className = "img-fluid rounded-start" alt = "..."/>
               </div> 
               <div className = "col-md-8" >
               <div className = "card-body1" >
                 <h5 className = "card-title" > { movieinfo.title } < a > ({ movieinfo.vote_average }) </a>   </h5>
                 <p className = "card-text" > { movieinfo.release_date && movieinfo.release_date.substring(0, 4) } | { movieinfo.runtime } min | { director } </p>
                 <p className = "card-text" > cast: { cast && cast.cast && cast.cast.length > 0 && cast.cast[0].name }, { cast && cast.cast && cast.cast.length > 1 && cast.cast[1].name }... </p>
                 <p className = "card-text" > { movieinfo.overview } </p> 
               </div>
               </div> 
               </div > 
             </div> 
        </div>
    );
}

export default Details;