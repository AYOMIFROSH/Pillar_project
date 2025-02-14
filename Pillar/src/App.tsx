import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from "./context/useContext";
import CheckEmailPage from "./Authentication/PasswordReset";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import ForgottenPwd from "./Authentication/ForgottenPwd";
import VerificationPage from "./Authentication/VerificationPage";
import Landing from "./Authentication/LandingPage";
import UserPage from "./Authentication/UserPage";
import AppLayout from "./Authentication/Layout";
import SimpleEditableCsvTable from "./component/UploadedCsvTable";

function App() {
  const { isAuthenticated, isVerified } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/forgot",
      element: <ForgottenPwd />,
    },
    {
      path: "/check-email",
      element: <CheckEmailPage />,
    },
    {
      path: "/login",
      element: !isAuthenticated ? (
        <Login />
      ) : isVerified ? (
        <Navigate to="/user" />
      ) : (
        <Navigate to="/verify" />
      ),
    },
    {
      path: "/register",
      element: !isAuthenticated ? <SignUp /> : <Navigate to="/verify" />,
    },
    {
      path: "/verify",
      element: !isAuthenticated || isVerified ? (
        <Navigate to="/login" />
      ) : (
        <VerificationPage />
      ),
    },
    {
      path: "/",
      element: isAuthenticated ? (
        isVerified ? (
          <AppLayout />
        ) : (
          <Navigate to="/verify" />
        )
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { path: "/user", element: <UserPage /> },
        { path: "/csv", element: <SimpleEditableCsvTable /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


