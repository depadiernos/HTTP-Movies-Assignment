import React, { useState } from "react";
import axios from "axios";

export default function AddMovie(props) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });
  const [stars, setStars] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then(result => {
        props.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleChangeStars = (e) => {
    setStars({...stars, [e.target.name]:e.target.value});
    const starsArray = Object.keys(stars).map((item)=>stars[item])
    setMovie({ ...movie, stars: starsArray });
  };

  return (
    <div className="save-wrapper movie-card">
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <br />
          <input
            required
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
            required
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
            required
            type="text"
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
            required
            type="text"
            name="stars[0]"
            placeholder="Star 1"
            onChange={e => handleChangeStars(e, 0)}
            value={stars[0]}
          />
          <input
            type="text"
            name="stars[1]"
            placeholder="Star 1"
            onChange={e => handleChangeStars(e, 1)}
            value={stars[1]}
          />
          <input
            type="text"
            name="stars[2]"
            placeholder="Star 1"
            onChange={e => handleChangeStars(e, 2)}
            value={stars[2]}
          />
        </label>
        <br />
        <button type="submit" className="save-button">
          Add Movie!
        </button>
      </form>
    </div>
  );
}
