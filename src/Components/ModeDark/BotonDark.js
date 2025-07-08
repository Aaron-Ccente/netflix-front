import React, { useEffect, useState } from "react";
import Luna from "../../Icons/Luna";
import Sol from "../../Icons/Sol";

const BotonDark = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Intenta leer la preferencia previa del usuario
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="px-4 py-1  transition-colors"
    >
      {darkMode ? <Luna/> : <Sol/> }
      
     
    </button>
  );
};

export default BotonDark;
