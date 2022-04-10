import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react';
import Genres from '../../components/genre/Genres.jsx';
import CustomPagination from '../../components/Pagination/CustomPagination.jsx' 
import SingleContent from '../../components/SingleContent/SingleContent.js'
import useGenres from '../../customhooks/useGenre.js';

const Movies = () => {

  const [page,setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const genreforURL = useGenres(selectedGenres);

  const fetchMovies = async () =>{
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages)
     
  }

  useEffect(()=>{
    fetchMovies();
  },[page,genreforURL])

  return (
    <div>
        <span className='pageTitle'>Movies</span>
        <Genres type="movie" 
        selectedGenres={selectedGenres} 
        genres={genres} 
        setGenres={setGenres} 
        setSelectedGenres={setSelectedGenres} 
        setPage={setPage}
        />
        <div className='trending'>
        {
          content && content.map((c)=> (
            <SingleContent 
            key={c.id} 
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name} 
            date={c.release_date || c.first_air_date}
            media_type="Movie"   
            vote_average={c.vote_average}
            />
          ))
        }
        </div>
        {numOfPages > 1 && (
          <CustomPagination setpage={setPage} numOfPages={numOfPages} />
        ) }
    </div>
  )
}

export default Movies