import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const MovieCards = ({ title, image, rating, sauce }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: "200px",
        height: "300px",
        backgroundColor: "#141414",
        borderRadius: "10px",
        boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
      <motion.img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "60%",
          objectFit: "cover",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#fff",
          margin: "10px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {title}
      </motion.h2>
      <motion.div
        style={{ margin: "10px", display: "flex", alignItems: "center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <span role="img" aria-label="rating" style={{ marginRight: "5px" }}>
          {rating}
        </span>
        <span>{sauce}</span>
      </motion.div>
    </motion.div>
  );
};

export default MovieCards;
