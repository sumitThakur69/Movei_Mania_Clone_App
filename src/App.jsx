import React, { useState , useEffect } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import Card from './components/Card'
import useDebounceValue from './hooks/DeBounce';
import Pagination from './components/Pagination';
// import FormValidation from './components/Validation';
import Navbar  from './components/Navbar';
import Category from './components/Category';


const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () =>{
const [searchTerm , setSearchTerm] = useState("");
const [error , setError] = useState("");
const [movieList , setMovieList] = useState([]);
const [isLoading , setIsLoading] = useState(false)
const [trending , setTrending] = useState([])
const [currentPage , setCurrentPage] = useState(1)
const [totalPages , setTotalPages] = useState(1)
const [filters , setFilters] = useState({
  category: 'rating',
  sorting: 'sorting',
});
// const [deBounce , setDeBounce] = useState('')

const deBounce = useDebounceValue(searchTerm,1000)

const fetchTrending = async() => {
  try {
    const url = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
    const res = await fetch(url , API_OPTIONS)

    if(!res.ok) {
      throw new Error("Failed to fetch the Trending Movies")
    }

    const data = await res.json();
    setTrending(data.results || [])
  } catch (error) {
    console.log("Trending Fetch Error", error);
    setError("Trending fetching moveis. PLease try again later.");
  }
}

const fetchMovies = async (query = '' , page = 1) => {
  setIsLoading(true);
  setError('');
  try {
    const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}` :
    `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`
    const res = await fetch(endpoint, API_OPTIONS)
    
// setTotalPages(Math.min(data.total_pages) || 1 , 500)
// setCurrentPage(page)

    if(!res.ok){
      throw new Error('Failed to fetch movies')
    }

    const data = await res.json()

    setTotalPages(Math.min(data.total_pages || 1 , 500));
    setCurrentPage(page)
    
    if(data.res === 'False'){
      setError(data.Error || 'Failed To Fetch Movies');
      setMovieList([]);
      return;
    }

    setMovieList(data.results || []) 

  } catch (error) {
      console.log(`Error Fetching moveis ${error}`)
      setError("Value fetching moveis. PLease try again later.");
  }
  finally {
    setIsLoading(false)
  }
}

const handlePageChange = (newPage) => {
  if(newPage >=1 && newPage <= totalPages){
    fetchMovies(deBounce , newPage);
    window.scrollTo({top:0,behavior:'smooth'})
  }
}

useEffect(()=>{
  setCurrentPage(1)
  fetchMovies(deBounce);
},[deBounce])

useEffect(()=>{
  fetchTrending();
},[])

useEffect(()=>{
  const saved = localStorage.getItem("filters");
  if(saved) {
    setFilters(JSON.parse(saved));
  }
},[])

const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  localStorage.setItem("filters", JSON.stringify(newFilters));
}

const sortMovies = (movies) => {
  const sorted = [...movies];

  sorted.sort((a,b)=>{
    let valA , valB;

    switch(filters.category){
      case 'rating':
        valA = a.vote_average || 0;
        valB = b.vote_average || 0;
        break;

      case 'year':
        valA = new Date(a.release_date || '1900').getFullYear();
        valB = new Date(b.release_date || '1900').getFullYear();
        break;
      case 'title':
        valA = a.title?.toLowerCase() || '';
        valB = b.title?.toLowerCase() || '';
        break;
      case 'popularity':
        valA = a.popularity || 0;
        valB = b.popularity || 0;
        break;
      default:
      return 0;
    }

    if(typeof valA === 'string'){
      return filters.sorting === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return filters.sorting === 'asc' ? valA - valB : valB - valA;
  })
  return sorted;
}

const sortedMovies = sortMovies(movieList);

return (
  <>
  {/* <CustomCursor /> */}
  <main>
  <Navbar />
  <div className='relative w-full min-h-screen  overflow-hidden'>
    <video 
    className='absolute w-full h-full top-0 left-0 z-0 opacity-20'
      autoPlay
      muted
      loop
      src="./bg.mp4"></video>
  <h1 className='text-7xl mt-32 p-8 max-md:text-6xl'>
    Welcome To Biggest<br/>
    <span className='text-gradient inline-block text-8xl max-md:text-5xl'> Movie Hub</span>
    </h1>
      <section className="trending hover:">
        <h2 className='text-center'>Top Movies Shows</h2>

        <ul>
          {trending.slice(0, 15).map((movie, index) => (
            <li key={movie.id}>
              <p>{index + 1}</p>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "/no-movie.png"
                }
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      </section>
      </div>
  <FormValidation />
 
    <div className='pattern' />
    <div className='wrapper'>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>
          Find<span className="text-gradient"> Movies</span> You Will Enjoy Without the Hassle
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <section className="trending">
        <h2>Trending Movies</h2>
        <ul>
          {trending.slice(0, 5).map((movie, index) => (
            <li key={movie.id}>
              <p>{index + 1}</p>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "/no-movie.png"
                }
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className='all-movies'>
        <div className='flex flex-row items-center justify-between mt-12'>
        <h2>All Movies</h2>
        <Category filters={filters} onFilterChange={handleFilterChange} />
        </div>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <>
            <ul>
              {sortedMovies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </ul>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section>
    </div> 
  </main>
  </>
);
}
export default App;