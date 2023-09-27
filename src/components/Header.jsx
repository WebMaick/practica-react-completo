import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="bg-gray-900  flex-wrap p-2">
      <div className="flex justify-between h-12 max-w-6xl items-center mx-auto">
        <Link to="/">
          <h1>
            <span className="text-gray-300 text-2xl">WebMaick</span>
            <span className="text-red-500 font-bold"> Design</span>
          </h1>
        </Link>

        <form className="bg-gray-100 p-2 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none mr-2 w-24 sm:w-44"
            type="text"
            placeholder="Buscar..."
          />
          <BsSearch />
        </form>

        <ul className="sm:flex sm:gap-2 text-gray-300 hidden">
          <Link to="/">
            <li className="cursor-pointer hover:text-red-500">Inicio</li>
          </Link>

          <Link to="/about">
            <li className="cursor-pointer hover:text-red-500">Nosotros</li>
          </Link>

          <Link to="/sign-in">
            <li className="cursor-pointer hover:text-red-500">Login</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
