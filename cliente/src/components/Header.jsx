import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="flex-wrap p-2 bg-gray-900">
      <div className="flex items-center justify-between h-12 max-w-6xl mx-auto">
        <Link to="/">
          <h1>
            <span className="text-2xl text-gray-300">WebMaick</span>
            <span className="font-bold text-red-500"> Design</span>
          </h1>
        </Link>

        <form className="flex items-center p-2 bg-gray-100 rounded-lg">
          <input
            className="w-24 mr-2 bg-transparent focus:outline-none sm:w-44"
            type="text"
            placeholder="Buscar..."
          />
          <BsSearch />
        </form>

        <ul className="hidden text-gray-300 sm:flex sm:gap-2">
          <Link to="/">
            <li className="cursor-pointer hover:text-red-500">Inicio</li>
          </Link>

          <Link to="/about">
            <li className="cursor-pointer hover:text-red-500">Nosotros</li>
          </Link>

          {currentUser ? (
            // <img src="" alt="imagen" width={"40px"} height={"40px"} />
            <Link to="/profile">
              <li>
                <h3>{currentUser.fullname}</h3>
              </li>
            </Link>
          ) : (
            <Link to={"/signin"}>
              <li className="cursor-pointer hover:text-red-500">Login</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};
