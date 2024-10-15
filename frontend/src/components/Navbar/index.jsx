import "./index.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="w-5/12 m-auto mt-8 bg-indigo-600 text-white min-h-20 flex justify-between items-center gap-3 px-3 rounded-lg">
        <NavLink to="/" className="text-lg">Home</NavLink>
        <ul className="flex items-center gap-3">
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};