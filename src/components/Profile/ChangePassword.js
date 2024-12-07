// ChangePassword.jsx
import React, { useState } from 'react';
import { TextField, Divider, Button, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { sessionUnAuthCheck } from '../../utils/Common';
import { useNavigate } from 'react-router';
import { changePassword } from '../../store/actions/UserActions';

const ChangePassword = ({ handleClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleSaveConfirmation = async () => {
    setIsUpdating(true)
    setOpenSaveDialog(false);
    try {
      const data = {
        'currentPassword': oldPassword,
        'createPassword': newPassword,
        'confirmPassword': confirmPassword
      }
      const response = await changePassword(data);
      if (response.data === true) {
        toast.success('Password Changed Successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          closeButton: false,
          draggable: false
        });
        setIsUpdating(false);
        handleClose();
      } else {
        toast.error('Failed to Update Profile', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false
        });
        setIsUpdating(false);
        handleClose();
      }
    } catch (error) {
      console.error('Error Changing Password :', error);
      sessionUnAuthCheck(error) && navigate('/logout');
      toast.error(error?.response?.data?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: false
      });
      setIsUpdating(false);
      handleClose();
    }
  };

  const handleCancel = () => {
    setOpenSaveDialog(false);
    handleClose();
  }

  const handleChangePassword = () => {
    setOpenSaveDialog(true);
  };

  const handleCancelChangePassword = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    handleClose();
  };

  return (
    <Box p={2}>
      <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
        <Typography variant="h6">Change Password</Typography>
        <TextField
          label="Old Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Divider style={{ margin: '20px 0' }} />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleChangePassword}>
            Save Password
          </Button>
          <Button variant="contained" color="error" onClick={handleCancelChangePassword}>
            Cancel
          </Button>
        </Box>
      </Paper>
      <Dialog open={openSaveDialog} onClose={handleCancel}>
        <DialogTitle align='center'>Confirm Password Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the password?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveConfirmation} color="primary">
            Yes
          </Button>
          <Button onClick={handleCancel} color="error">
            No
          </Button>

        </DialogActions>
      </Dialog>
      <Dialog open={isUpdating} >
        <DialogContent>
          <CircularProgress size={100} thickness={4} style={{color:'red'}}/>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default ChangePassword;
