import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import Login from 'componets/Auth/components/Login/Login.jsx';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { logout } from 'componets/Auth/userSlice.js';
import { AccountCircle, Close } from '@mui/icons-material';
import Register from 'componets/Auth/components/Register/index.jsx';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

export const Header = () => {

    const DemoButton = styled(Button)(() => ({
        color: '#fff',
    }))

    const CloseButton = styled(IconButton)(() => ({
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'rgba(0, 0, 0, 0.54)'
    }))

    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action)
    }

    return (
        <div style={{ marginBottom: 120 }}>
            <AppBar style={{ backgroundColor: '#64BE43', height: 100, justifyContent: 'center', paddingLeft: 120 }}>
                <Toolbar variant="dense" >
                    <Link style={{ textDecoration: 'none' }} to={'/'}><img className='logo' src='http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/logo-robin-white.png' /></Link>
                    <Link style={{ textDecoration: 'none', marginLeft: 30 }} to={'/intro'}><p className='category'>Giới Thiệu</p></Link>
                    <p className='category'>Chim Cảnh</p>
                    <p className='category'>Gà Cảnh</p>
                    <Link style={{ textDecoration: 'none' }} to={'/birdCage'}><p className='category'>Lồng Chim</p></Link>
                    <p className='category'>Cám Chim</p>
                    <p className='category'>Phụ Kiện</p>
                    <Link style={{ textDecoration: 'none' }} to={'/news'}><p className='category'>Tin Tức</p></Link>
                    <p className='category'>Liên Hệ</p>
                    <div style={{ marginLeft: 80 }}>
                        <SearchIcon style={{ marginRight: 15, marginLeft: 20 }} />
                        {/* <PersonIcon onClick={handleClickOpen} style={{ marginRight: 15 }} /> */}
                        {!isLoggedIn && (
                            <PersonIcon onClick={handleClickOpen} style={{ marginRight: 15 }} />
                        )}

                        {isLoggedIn && (
                            <IconButton color="inherit" onClick={handleUserClick} style={{ marginRight: 15 }}>
                                <AccountCircle />
                            </IconButton>
                        )}
                        <LocalMallIcon />
                    </div>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog open={open} onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose(event, reason);
                }
            }}>

                <CloseButton onClick={handleClose} >
                    <Close />
                </CloseButton>

                <DialogContent>

                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>Already have an account. Login here</Button>
                            </Box>
                        </>
                    )}

                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>Don't have an account. Register here</Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
