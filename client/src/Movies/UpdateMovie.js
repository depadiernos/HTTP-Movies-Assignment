import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: ["Kurt Russell", "Bill Paxton", "Sam Elliot"]
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(result => {
        setMovie(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const handleSubmit = () => {};

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleChangeStars = e => {
    const stars = e.target.value.split(/[,]+/).filter(Boolean)
    setMovie({ ...movie, [e.target.name]: stars });
  }

  return (
    <div className="save-wrapper movie-card">
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={movie.title}
          />
        </label>
        <br />
        <label>
          Director
          <br />
          <input
            type="text"
            name="director"
            placeholder="Director"
            onChange={handleChange}
            value={movie.director}
          />
        </label>
        <br />
        <label>
          Metascore
          <br />
          <input
            type="number"
            name="metascore"
            placeholder="Metascore"
            onChange={handleChange}
            value={movie.metascore}
          />
        </label>
        <br />
        <label>
          Stars
          <br />
          <input
            type="text"
            name="stars"
            placeholder="Starring Actors (comma separate)"
            onChange={handleChangeStars}
            value={movie.stars}
          />
        </label>
        <br />
        <button type="submit" className="save-button">
          Update!
        </button>
      </form>
    </div>
  );
}
