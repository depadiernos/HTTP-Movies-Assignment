import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}


