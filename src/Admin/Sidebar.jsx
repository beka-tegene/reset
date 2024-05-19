import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white fixed">
      <div className="p-4 font-bold text-xl">
        Admin Panel
      </div>
      <nav className="mt-10">
        <NavLink
          to="/admin/users"
          className={({ isActive }) => `block px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          User List
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
