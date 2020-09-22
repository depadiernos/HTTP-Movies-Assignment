import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
export default function Movie(props) {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: 0,
    stars: [''],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  };

  const handleDelete = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => props.history.push('/'))
    .catch(err => console.log(err.response));
  }

  return !movie.title ? (
    <div>Loading movie information...</div>
  ) : (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="home-button">
        <Link to={`/update-movie/${movie.id}`}>Update Movie</Link>
      </div>
      <div className="home-button" onClick={handleDelete}>Delete Movie</div>
    </div>
  );
}
