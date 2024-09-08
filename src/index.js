import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./Assets/Style/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Loader from "./Components/Loader/Loader";
import Form from "./Pages/Form";
import Signup from "./Pages/Signup";
import { messaging, onMessage } from "./firebaseConfig";
import { requestPermission } from "./services/notificationService";

const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Pages/Login"));
const Feedback = React.lazy(() => import("./Pages/Feedback"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Sights = React.lazy(() => import("./Pages/Sights"));

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Request permission on app load
    requestPermission();

    // Handle foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      });
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loader />}>
                <Signup />
              </Suspense>
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/home"
              element={
                <Suspense fallback={<Loader />}>
                  <Sights />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/feedback"
              element={
                <Suspense fallback={<Loader />}>
                  <Feedback />
                </Suspense>
              }
            />
            <Route
              path="/add-sighting"
              element={
                <Suspense fallback={<Loader />}>
                  <Form />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
