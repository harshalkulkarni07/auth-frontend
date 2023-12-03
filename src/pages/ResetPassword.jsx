import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { Link, useNavigate } from "react-router-dom";
const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    let token = localStorage.getItem("jwt");
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/users/resetpassword`,
        {
          resetToken:token,
          newPassword:password
        }
      );
      console.log(data)
      setMessage(data.message);
      setTimeout(() => {
        navigate("/login");
      }, "1000");
    } catch (error) {
      setMessage('Failed to reset password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br></br>
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
