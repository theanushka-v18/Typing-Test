import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../context/ThemeContext';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import errorMapping from '../utils/errorMapping';
import { auth } from '../firebaseConfig';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const {theme} = useTheme();

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        if(user) {
            navigate('/user');
        } else {
            setOpen(true);
        }
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    const handleValueChange = (e, v) => {
        setValue(v);
    }

    const handleLogout = () => {
        auth.signOut().then((res) => {
            toast.success('Logged Out', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error('Not able to logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider).then((res) => {
            toast.success('Google Login Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error(errorMapping[err.code] || 'Not able to use Google Authentication', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        });
    }

    return (
        <div>
            <AccountCircleIcon onClick={handleOpenModal} />
            {user && <LogoutIcon onClick={handleLogout} />}
            <Modal
                open={open}
                onClose={handleModalClose}
                style={
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }
            >
                <div style={{width: '400px', textAlign: 'center'}}>
                    <AppBar style={{position: 'static', background: 'transparent'}}>
                        <Tabs
                            value={value}
                            variant='fullWidth'
                            onChange={handleValueChange}
                        >
                            <Tab label='login' style={{color: theme.textColor}}></Tab>
                            <Tab label='signup' style={{color: theme.textColor}}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm handleModalClose={handleModalClose} />}
                    {value === 1 && <SignupForm handleModalClose={handleModalClose} />}

                    <Box>
                        <span>OR</span>
                        <GoogleButton 
                            style={
                                {
                                    width: '100%',
                                    marginTop: '12px'
                                }
                            }
                            onClick={handleGoogleSignIn}
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle
