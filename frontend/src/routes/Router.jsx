import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Prediction from "../components/Prediction";
import HorasMundo from "../components/HorasMundo";
import App from "../App";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/prediction",
        element: <Prediction />,
        children: [
          {
            path: ":id",
            element: <Prediction />,
          },
        ],
      },
      /*  // esto seria igual lo q pasa q la de arriba de children es mas orndenada pero sirve igual
      {
        path: "/prediction/:id",
        element: <Prediction />,
      }, */
      {
        path: "/horasmundo",
        element: <HorasMundo />,
        children: [
          {
            path: ":id",
            element: <HorasMundo />,
          },
        ],
      },
    ],
  },
]);

export default Router;
