import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BotonDark from "../ModeDark/BotonDark.js";
function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [ id_user, setIdUser ] = useState();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`http://localhost:8081/userId-of-person?id_persona=${user?.id}`)
      .then((res) => {setIdUser(res.data[0].id_user);})
      .catch((err) => console.log(err));
  }, [user?.id]);
  console.log(id_user)

  const handleHome = () => {
    navigate("/home");
  };
  const handleFavorite = (id) => {
    navigate("/favoritos", { state: { id } });
  };
  return (
    <>
      <header
        className={`fixed top-0 h-[90px] w-full z-50 transition-colors duration-300 ${
          scrolled
            ? " dark:bg-red-800 bg-red-800"
            : "bg-black  dark:bg-white"
        }`}
      >
        <nav className="h-full ">
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center justify-between w-full px-28">
              <span
                className="text-3xl hover:cursor-pointer flex items-center  h-[90px] w-[250px]"
                onClick={handleHome}
              >
                <img width={250} height={60} className="max-h-[60px]" alt="PELISUNCP logo" src="/PELISUNCP.webp" />
              </span>
              <div className="flex gap-4 items-center text-white font-semibold mt-2 dark:text-black">
                <span>Bienvenido, {user?.name}</span>
                <span>
                  <button
                  className=" text-white border-2 border-white/60 px-6 py-1 rounded hover:text-red-600 hover:border-red-600 hover:bg-white dark:text-black dark:border-black"
                    
                    onClick={() => handleFavorite(id_user)}
                  >
                    Favoritos
                  </button>
                </span>
                <span>
                  <button
                    className="hover:bg-red-800 hover:text-white text-red-600 font-bold px-6 py-1 rounded border-2 hover:border-white border-red-600 "
                    onClick={handleLogOut}
                  >
                    SALIR
                  </button>
                  
                </span>
                <BotonDark/>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Nav;
