import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { userSettingsStore } from '../stores/userSettingsStore';

const NotificationPopup = ({ open, message, onClose, severity = 'warning' }) => {
    return (
        userSettingsStore.alertsEnabled && open ? (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={onClose} severity={severity} sx={{ width: '300px' }}>
                    {message}
                </Alert>
            </Snackbar>
        ) : null
    );
};

export default NotificationPopup;
