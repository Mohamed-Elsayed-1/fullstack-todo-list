import "./index.css";
import { NavLink , useLocation} from "react-router-dom";
import Cookies from "js-cookie";

export const Navbar = () => {
  const token = Cookies.get("Token");
  const {pathname} = useLocation();
  return (
    <nav>
      <div className="w-5/12 m-auto mt-8 bg-indigo-600 text-white min-h-20 flex justify-between items-center gap-3 px-3 rounded-lg">
        <NavLink to="/" className="text-lg">
          Home
        </NavLink>
        <ul className="flex items-center gap-3">
          {!token ? (
            <>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  Cookies.remove("Token");
                  setTimeout(()=>{

                    location.replace(pathname);
                  },1500)
                }}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
