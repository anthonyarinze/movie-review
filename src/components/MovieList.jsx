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
  const [isHovering, setIsHovering] = useState(false);

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
  return (
    <>
      <motion.div
        style={{
          backgroundImage: `url(${gump})`,
          backgroundSize: "cover",
          width: "65vw",
          height: "70vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          color: "black",
          marginLeft: "2rem",
          marginTop: "4rem",
          borderRadius: "4.5px",
          position: "relative",
          overflow: "hidden", // added to hide the gradient when not hovering
          transition: "background-color 0.5s ease", // added for smooth transition
        }}
        whileHover={{
          backgroundColor: "rgba(0,0,0,0.5)", // added background color on hover
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3))", // added initial gradient
          opacity: 0.5,
          zIndex: 1,
          backgroundImage: `url(${gump})`,
          backgroundSize: "cover",
          color: "white",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && (
          <>
            <div
              style={{
                position: "absolute",
                top: "10rem",
                left: "1rem",
                fontSize: "2rem",
                fontWeight: "bold",
                zIndex: 1,
                color: "black",
              }}
            >
              Forrest Gump
            </div>
            <div
              style={{
                position: "absolute",
                top: "13rem",
                zIndex: 1,
                left: "1rem",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              Rating: 8.8 (IMDB)
            </div>
          </>
        )}
      </motion.div>

      <div className="featured">
        <span>Featured</span>
      </div>

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
