import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./page/User/SignUp.tsx";
import SignIn from "./page/User/SignIn.tsx";
import { GuestRoute } from "./ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ErrorModalProvider } from "./contexts/ErrorModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorModalProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignUp />
                </GuestRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <GuestRoute>
                  <SignIn />
                </GuestRoute>
              }
            />
          </Routes>
        </ErrorModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
