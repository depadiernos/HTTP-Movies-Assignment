import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: ['','','']
  });
  const [stars, setStars] = useState([])

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

  const handleSubmit = (e) => {
      e.preventDefault();
      axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(result => {
        props.history.push(`/`)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleChangeStars = e => {
    setStars({ ...stars, [e.target.name]: e.target.value });
    setMovie({...movie, stars})
  };

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
            name="stars[]"
            placeholder="Star 1"
            onChange={handleChangeStars}
            value={movie.stars[0]}
          />
          <input
            type="text"
            name="stars[]"
            placeholder="Star 1"
            onChange={handleChangeStars}
            value={movie.stars[1]}
          />
          <input
            type="text"
            name="stars[]"
            placeholder="Star 1"
            onChange={handleChangeStars}
            value={movie.stars[2]}
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
