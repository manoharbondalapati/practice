// App.js
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { selectIsAuthenticated } from "./redux/LoginSlice";
import Comments from "./components/Comments";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {isAuthenticated ? (
          <>
            <Route path="/posts" element={<Posts />} />
            <Route path="/comments/:postId" element={<Comments />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
