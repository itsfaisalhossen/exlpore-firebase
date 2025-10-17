import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "About-as",
        element: <About />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "Sign-in",
        element: <SignIn />,
      },
      {
        path: "Sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
