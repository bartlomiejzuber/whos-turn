import React from "react";

const Header = props => (
  <header className={`App-header ${props.start ? "start" : ""}`}>
    Whos Turn?
  </header>
);

export default Header;
