import React, { useState } from 'react';
import './App.css';


const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=3911d124';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState (false);

  const SearchMov = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${query}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    setLoading(false);
  }

  return (
    <div className={darkMode ? 'app light' : 'app dark'}>
      <div className='App'>
      <button
      onClick={() => setDarkMode(!darkMode) }
      className='tema'>
        {darkMode ? 'AK' : 'Gara'}
      </button>
      </div>
      <h1>Kino gözleg</h1>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <form onSubmit={SearchMov}>
        <input
          className='input'
          type='text'
          placeholder='Kino adyny giriz...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
      </form>

      {loading && <p className='lines'>
        <i class="fa fa-spinner fa-spin"/>
        </p>
        }

      <div className='mov-list'>
        {!loading && movies.length > 0 ? (
          movies.map((movie) => (
            <div className='mov-item' key={movie.ImdbID}>

              {movie.Poster !== 'N/A' ? (
                <img src={movie.Poster} alt={movie.Title} />
              ) : (
                <div className='no-poster'>Suraty ýok</div>
              )
              }
            </div>
          ))
        ) : !loading && (
          <p className='App'>Netije ýok!</p>
        )}
      </div>
    </div>

  )
}

export default App;

