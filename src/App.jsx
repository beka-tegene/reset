import React from "react";
import { Route, Routes } from "react-router-dom";
import Reset from "./Reset";
import Login from "./Admin/Login";
import UserList from "./Admin/UserList";
import AdminLayout from "./Admin/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Reset />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="user-list" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default App;
