import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {
    toast,
} from 'react-toastify';
import { sendCustomNotifyMessage } from '../../store/actions/AdminActions';

const NotifyWorkshop = ({ open, onClose, workshopId }) => {

    const [message, setMessage] = useState({});

    const handleCancel = () => {
        onClose();
    };

    const handleChange = (name, value) => {
        setMessage((prevMessage) => ({
            ...prevMessage,
            [name]: value,
        }));
    };

    const sendMessage = async () => {
        try {
            message['workshopId'] = workshopId;
            const response = await sendCustomNotifyMessage(message);
            if (response) {
                toast.success('Notification Sent Successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    closeButton: false,
                    draggable: false
                });
                onClose();
            } else {
                toast.error('Notification Failed to Sent', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    closeButton: false,
                    draggable: false
                });
                onClose();
            }
        } catch (error) {
            toast.error('Notification Failed to Sent', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                closeButton: false,
                draggable: false
            });
            onClose();
        }
    }

    const handleSendNotification = () => {

        if (!message || String(message).trim !== '') {
            sendMessage();
        }
    }

    return !open ? <></> : (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ style: { minWidth: '300px' } }}>
            <DialogTitle>New Message</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    placeholder='Subject'
                    value={message?.subject}
                    minRows={5}
                    onChange={(e) => {
                        handleChange("subject", e.target.value);
                    }}
                />
                <TextField
                    multiline
                    fullWidth
                    placeholder='Please provide your message here'
                    value={message?.message}
                    minRows={5}
                    onChange={(e) => {
                        handleChange("message", e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSendNotification} color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotifyWorkshop;
