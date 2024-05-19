import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://gratify.letsgotnt.com/api/v1/users/getallusers/"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRowClick = (row) => {
    setSelectedUser(row);
    setIsModalOpen(true);
  };

  const handleApprove = async () => {
    try {
      await axios.patch(
        `https://gratify.letsgotnt.com/api/v1/users/${selectedUser._id}/approve`
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, status: "Approved" } : user
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error approving user", error);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.patch(
        `https://gratify.letsgotnt.com/api/v1/users/${selectedUser._id}/decline`
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, status: "Declined" } : user
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error declining user", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "120px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser(row);
              handleApprove();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => {
              setSelectedUser(row);
              handleDecline();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decline
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-4 w-[80%] ml-[20%]">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <DataTable
        columns={columns}
        data={users}
        progressPending={loading}
        pagination
        onRowClicked={handleRowClick}
        className="min-w-full bg-white border border-gray-200 rounded-lg"
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="flex items-center justify-center h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedUser && (
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex justify-center">
                <img
                  src={selectedUser?.pictures[0]}
                  alt="Profile"
                  className="h-24 w-24 object-cover rounded-full"
                />
              </div>
              <div>
                <strong>Name:</strong>
                <p>
                  {selectedUser.firstname} {selectedUser.lastname}
                </p>
              </div>
              <div>
                <strong>Email:</strong>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <strong>Phone Number:</strong>
                <p>{selectedUser.phoneNumber}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p>{selectedUser.status}</p>
              </div>
              <div>
                <strong>Username:</strong>
                <p>{selectedUser.username}</p>
              </div>
              <div>
                <strong>Profession:</strong>
                <p>{selectedUser.profession}</p>
              </div>
              <div>
                <strong>Native City:</strong>
                <p>{selectedUser.native_city}</p>
              </div>
              <div>
                <strong>Current City:</strong>
                <p>{selectedUser.currentcity}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Decline
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserList;
