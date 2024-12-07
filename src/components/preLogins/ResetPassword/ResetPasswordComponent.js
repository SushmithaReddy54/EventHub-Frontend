import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../store/actions/PreLoginActions";

const ResetComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { userId, token } = useParams(); // Extract userId and token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword(userId, token, password);
      console.log(response, "response");
      if (response?.data?.status.includes("Something Went Wrong")) {
        setErrorMessage("Failed to reset password. get reset link again");
        setSuccessMessage("");
      } else {
        setSuccessMessage("Password reset successfully!");
        setErrorMessage("");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password."
      );
      setSuccessMessage("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Reset Password
      </Typography>

      {errorMessage && (
        <Typography color="error" variant="body1" align="center">
          {errorMessage}
        </Typography>
      )}

      {successMessage && (
        <Typography color="primary" variant="body1" align="center">
          {successMessage}
        </Typography>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetComponent;
