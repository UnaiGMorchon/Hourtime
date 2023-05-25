import { createBrowserRouter } from "react-router-dom";
/* import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import HorasMundo from "../components/HorasMundo"; */
import Buscador from "../components/Buscador";
import App from "../App";
import RealTimeClock from "../components/RealTimeClock";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 not found</h1>,
    children: [
      /*  {
        path: "/",
        element: <Home />,
      },
 */
      {
        path: "/buscador",
        element: <Buscador />,
        children: [
          {
            path: ":id",
            element: <Buscador />,
          },
        ],
      },
      {
        path: "/reloj",
        element: <RealTimeClock />,
        children: [
          {
            path: ":id",
            element: <RealTimeClock />,
          },
        ],
      },
      {
        path: "/login",
      },
      {
        path: "/signup",
      },
    ],
  },
]);

export default Router;
