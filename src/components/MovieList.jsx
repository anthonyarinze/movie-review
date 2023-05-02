// @ts-nocheck
import React, { useState, useEffect } from "react";
import MovieCards from "./MovieCards";
import axios from "axios";
import { motion } from "framer-motion";
import gump from "../assets/gump.png";
// @ts-ignore
const apiKey = import.meta.env.VITE_API_KEY;

const movieIds = [
  "tt0111161",
  "tt0068646",
  "tt0071562",
  "tt0468569",
  "tt0050083",
  "tt0108052",
  "tt0167260",
  "tt0137523",
  "tt0109830",
];

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storageKey = "moviesData";
    const cachedData = localStorage.getItem(storageKey);

    if (cachedData) {
      setMovies(JSON.parse(cachedData));
    } else {
      const promises = movieIds.map((id) =>
        axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
      );
      Promise.all(promises)
        .then((responses) => {
          const moviesData = responses.map((response) => response.data);
          setMovies(moviesData);
          localStorage.setItem(storageKey, JSON.stringify(moviesData));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const size = movies.length - 1;
  const lastMovie = movies[size];
  return (
    <>
      <motion.div
        style={{
          height: "80vh",
          width: "80vw",
          backgroundImage: `url(${gump})`,
          backgroundSize: "contain",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
          margin: "2.5rem 0 1.5rem 2rem",
          borderRadius: "4.5px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          style={{
            color: "white",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {"lastMovie.Title"}
        </motion.h2>
        <motion.h3
          style={{ color: "white", margin: "0", textAlign: "center" }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Rating: {"lastMovie.imdbRating"}
        </motion.h3>
      </motion.div>

      <div className="movies">
        {movies.slice(0, size).map((movie, index) => (
          <MovieCards
            key={index}
            title={movie.Title || "Title"}
            image={movie.Poster || "img"}
            rating={"3"}
            // sauce={movies.Ratings[1].Source}
          />
        ))}
      </div>
    </>
  );
};

export default MovieList;
