import React from "react";
import Search from "./Search";

const Header = () => {
  return (
    <nav className="navbar">
      <a href="#" className="brand">
        Movies<span className="hub">Hub</span>
      </a>
      <Search />
    </nav>
  );
};

export default Header;
