import styled from '@emotion/styled';
import { AccountCircle, Close } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Badge, Box, Menu, MenuItem, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import useBirdCart from 'api/apiProduct/useBirdCart';
import Login from 'componets/Auth/components/Login/Login.jsx';
import OTP from 'componets/Auth/components/OTP_Auth/OTP';
import Register from 'componets/Auth/components/Register/index.jsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Header/Header.css';
import SellIcon from '@mui/icons-material/Sell';
const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
    OTP: 'otp-auth'
}

function Header() {

    const CloseButton = styled(IconButton)(() => ({
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'rgba(0, 0, 0, 0.54)'
    }))

    const isLoggedIn = localStorage.getItem('token');
    const formattedToken = isLoggedIn?.replace(/"/g, '');
    const { cartItem } = useBirdCart(formattedToken)
    console.log(formattedToken)
    const totalCount = cartItem?.total
    
    // const totalCount = cartItems?.reduce((total, item) => total + item.count, 0);

    const handleTotalProd = (count) => {
        if(count < 10) {
            return count
        } else {
            return '9+'
        }
    }

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null)
    // const cartItemsCount = useSelector(cartItemsCountSelector)
    const history = useNavigate();
    const navigate = useNavigate()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMode(() => MODE.LOGIN)
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const handleCartClick = () => {
        history('/cart')
    }

    const handleAccount = () => {
        history('/user/order-history')
        setAnchorEl(null)
    }

    const handleWishlist = () => {
        history('/wishlist')
    }

    return (
        <div style={{ marginBottom: 120 }}>
            <AppBar style={{ backgroundColor: '#64BE43', height: 100, justifyContent: 'center', paddingLeft: 120 }}>
                <Toolbar variant="dense" >
                    <Link style={{ textDecoration: 'none' }} to={'/'}><img alt='' className='logo' src='http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/logo-robin-white.png' /></Link>
                    <Link style={{ textDecoration: 'none', marginLeft: 30 }} to={'/intro'}><p className='category'>Giới Thiệu</p></Link>
                    <ul class="navbar">
                        <li className='bridge'>
                            <p className='category' style={{ marginLeft: 0 }} href="#">Thiết Kế Lồng</p>
                            <ul className='list1'>
                                <li className='parent2'>
                                    <a href="">Lồng Chim Vẹt</a>
                                    <div className='line-cage'></div>
                                    <ul className='list2'>
                                        <li><a onClick={() => navigate('/designCage')}>Lồng bầu chạm</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Lực</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Sing</a></li>
                                    </ul>
                                </li>
                                <li className='parent2'>
                                    <a href="">Lồng Chim Sáo</a>
                                    <div className='line-cage'></div>
                                    <ul className='list2'>
                                        <li><a href="#">Lồng Chim Lực</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Sing</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Inox</a></li>
                                    </ul>
                                </li>
                                <li className='parent2'>
                                    <a href="">Lồng Chim Khuyên</a>
                                    <div className='line-cage'></div>
                                    <ul className='list2'>
                                        <li><a href="#">Lồng Chim Sing</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Inox</a></li>
                                    </ul>
                                </li>
                                <li className='parent2'>
                                    <a href="">Lồng Chim Khướu</a>
                                    <ul className='list2'>
                                        <li><a href="#">Lồng Lực</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Vuông</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Tròn</a></li>
                                        <div className='line-cage'></div>
                                        <li><a href="#">Lồng Chim Bẫy</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p className='category'>Gà Cảnh</p>
                    <Link style={{ textDecoration: 'none' }} to={'/birdCage'}><p className='category'>Lồng Chim</p></Link>
                    <p className='category'>Cám Chim</p>
                    <Link style={{ textDecoration: 'none' }} to={'/accessory'}><p className='category'>Phụ Kiện</p></Link>
                    <Link style={{ textDecoration: 'none' }} to={'/news'}><p className='category'>Tin Tức</p></Link>
                    <p className='category'>Liên Hệ</p>
                    <div style={{ marginLeft: 80 }}>
                        <IconButton color="inherit">
                            <SearchIcon />
                        </IconButton>

                        {!isLoggedIn && (
                            <IconButton color="inherit" onClick={handleClickOpen}>
                                <PersonIcon />
                            </IconButton>
                        )}

                        {isLoggedIn && (
                            <IconButton color="inherit" onClick={handleUserClick}>
                                <AccountCircle />
                            </IconButton>
                        )}
                        {isLoggedIn && (
                            <IconButton color="inherit" onClick={handleWishlist}>
                                <SellIcon />
                            </IconButton>
                        )}

                        <IconButton
                            color="inherit"
                            onClick={handleCartClick}
                        >
                            <Badge badgeContent={handleTotalProd(totalCount)} color="error">
                                <LocalMallIcon color="inherit" />
                            </Badge>
                        </IconButton>

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
                <MenuItem onClick={handleAccount}>Purchase history</MenuItem>
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
                            <Login closeDialog={handleClose} setMode={setMode} MODE={MODE}/>

                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>Don't have an account. Register here</Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.OTP && (
                        <>
                            <OTP closeDialog={handleClose} setMode={setMode} MODE={MODE}/>

                            {/* <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>Don't have an account. Register here</Button>
                            </Box> */}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default Header;
