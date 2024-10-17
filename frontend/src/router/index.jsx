import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { Register } from "../components/Register/Register";
import { Login } from "../components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Cookies from "js-cookie";
import { Profile } from "../pages/Profile/Profile";
const isAuth = () => {
  const token = Cookies.get("Token");
  return token;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoute isAuth={isAuth()} path={"/login"} />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute isAuth={!isAuth()} path={"/"} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
