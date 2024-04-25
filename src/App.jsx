import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [decodedTokens, setDecodedToken] = useState();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setDecodedToken(decodedToken);
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      setError("Please enter a new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const data = {
      email: decodedTokens.email,
      newPassword: password,
    };
    fetch("https://sarada.letsgotnt.com/api/v1/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Password reset successful");
        } else {
          toast.error("Password reset failed");
        }
      })
      .catch((error) => {
        toast.error("Error resetting password:", error);
      });
  };

  return (
    <div className="h-screen w-screen flex items-start justify-center pt-20 bg-[#E7F7E7]">
      <ToastContainer />
      <div className="bg-[#FFF] max-w-[500px] min-w-[300px] flex flex-col gap-4 p-5">
        <h4 className="text-2xl font-semibold">Reset Password</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border-[1px] outline-none px-2 p-1 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Re-type password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="border-[1px] outline-none px-2 p-1 rounded"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="w-full">
            <button
              type="submit"
              className="bg-[#873462] w-full py-1 font-bold text-white rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
