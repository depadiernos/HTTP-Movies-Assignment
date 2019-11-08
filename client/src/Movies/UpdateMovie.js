import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: ["", "", ""]
  });
  const [star1, setStar1] = useState("");
  const [star2, setStar2] = useState("");
  const [star3, setStar3] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(result => {
        setMovie(result.data);
        setStar1(result.data.stars[0]);
        setStar2(result.data.stars[1]);
        setStar3(result.data.stars[2]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.id]);

  useEffect(() => {
    setMovie(current => {return { ...current, stars: [star1, star2, star3] }});
  }, [star1, star2, star3]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
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

  const handleChangeStars = (e, index) => {
    e.target.name === "0" && setStar1(e.target.value);
    e.target.name === "1" && setStar2(e.target.value);
    e.target.name === "2" && setStar3(e.target.value);
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
            type="text"
            name="0"
            placeholder="Star 1"
            onChange={e => handleChangeStars(e, 0)}
            value={star1}
          />
          <input
            type="text"
            name="1"
            placeholder="Star 2"
            onChange={e => handleChangeStars(e, 0)}
            value={star2}
          />
          <input
            type="text"
            name="2"
            placeholder="Star 3"
            onChange={e => handleChangeStars(e, 0)}
            value={star3}
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
