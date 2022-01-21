import React from "react";

type Props = {};

const Header = ({ paths }: Props) => {
  return (
    <header>
      <nav>
        <ul>
          {paths.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
