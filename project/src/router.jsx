import { createBrowserRouter} from "react-router-dom";
import App from "./App";
import Signin from "./Authentication/Singin";
import Signup from "./Authentication/Singup";
import Dashboard from "./Authentication/DashBoard";

export const router = createBrowserRouter([
  {path: "/", element: <App />}, {path: "/signup", element: <Signup />},{path: "/signin", element: <Signin />},{path:"/Dashboard", element: <Dashboard />},
]);