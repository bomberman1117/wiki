import React from "react";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <a href="/">
        {import.meta.env.VITE_SAFE_MODE == 1 && <img
          className="logo"
          src="/images/Logo.png"
          alt={"Welcome to Amoros"}
        />}
      </a>
      <div>
        <a href="/pokedex">Pokedex</a>
      </div>
      <div>
        <a href="/humans">Characters</a>
      </div>
    </div>
  );
};

export default Sidebar;
