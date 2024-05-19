import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-white shadow px-4 w-[81%] ml-[19%]">
      <div className="text-2xl font-bold">Admin Dashboard</div>
      <div className="flex items-center">
        <div className="ml-4">Admin</div>
      </div>
    </div>
  );
};

export default Navbar;
