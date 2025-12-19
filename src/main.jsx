import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./app/App";
import SignIn from "./auth/SignIn";
import { auth } from "./auth/authStore";
import "./index.css";

function ProtectedRoute({ children }) {
  return auth.isAuthenticated() ? children : <Navigate to="/signin" />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer
        theme="dark"
        toastClassName="bg-slate-800 text-slate-100 border border-slate-700"
      />

      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />

        <Route
          path="/signin"
          element={
            <SignIn
              onSuccess={() => {
                auth.login();
                window.location.href = "/app";
              }}
            />
          }
        />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
