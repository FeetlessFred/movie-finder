import React, { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/movies/${page}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [page]);

  const showProviders = (movie) => {
    setSelectedMovie(movie);
    fetch(`http://localhost:5000/providers/${movie.id}`)
      .then(res => res.json())
      .then(data => setProviders(data.results?.US || null));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Hub</h1>
      <h2>Popular Movies (Page {page})</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map(m => (
          <div key={m.id} style={{ margin: "10px", width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
              style={{ width: "100%" }}
            />
            <h3>{m.title}</h3>
            <button onClick={() => showProviders(m)}>Where to Watch</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(Math.max(page - 1, 1))}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {selectedMovie && providers && (
        <div style={{ marginTop: "40px" }}>
          <h2>{selectedMovie.title} is available on:</h2>
          <ul>
            {providers.flatrate?.map(p => (
              <li key={p.provider_id}>
                {p.provider_name} - <a href={`https://www.google.com/search?q=${selectedMovie.title}+${p.provider_name}`} target="_blank">Watch</a>
              </li>
            )) || <li>No streaming info available</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
