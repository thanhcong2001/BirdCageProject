import styled from '@emotion/styled';
import { AccountCircle, Close } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';
import { AppBar, Badge, Box, Menu, MenuItem, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import apiClient from 'api/apiClient';
import useBirdCart from 'api/apiProduct/useBirdCart';
import Login from 'componets/Auth/components/Login/Login.jsx';
import OTP from 'componets/Auth/components/OTP_Auth/OTP';
import Register from 'componets/Auth/components/Register/index.jsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Header/Header.css';
const MODE = {
    LOGIN: "login",
    REGISTER: "register",
    OTP: "otp-auth",
};

function Header() {
    const CloseButton = styled(IconButton)(() => ({
        position: "absolute",
        top: 8,
        right: 8,
        color: "rgba(0, 0, 0, 0.54)",
    }));

    const [searchList, setSearchList] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isValid, setIsValid] = useState(false)
    const isLoggedIn = localStorage.getItem("token");
    const formattedToken = isLoggedIn?.replace(/"/g, "");
    const { cartItem } = useBirdCart(formattedToken);
    const [role, setRole] = useState(localStorage.getItem('role') || '')
    const totalCountProduct = cartItem?.shoppingCarts?.reduce(
        (total, item) => total + item.count,
        0
    );

    useEffect(() => { checkRole() }, [role])

    const checkRole = () => {

        if (role == 'Manager') setIsValid(true)
        else setIsValid(false)
    }

    const handleTotalProd = (count) => {
        if (count < 10) {
            return count;
        } else {
            return "9+";
        }
    };

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);
    // const cartItemsCount = useSelector(cartItemsCountSelector)
    const history = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMode(() => MODE.LOGIN);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleProfile = () => {
        navigate("/setting");
    };
    const handleDashboard = () => {
        navigate("/dashboard");
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        // window.location.reload();
        setAnchorEl(null)
        navigate('/intro')
    }

    const handleCartClick = () => {
        history("/cart");
    };
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
    };

    const handleSearch = (data) => {
        apiClient.get(`Product/search-by-title?title=${data}&pageIndex=0&pageSize=10`)
            .then(response => {
                setSearchList(response.data)
            })
            .catch((er) => {
                setSearchList([]);
            });
    };

    const handleAccount = () => {
        history("/user/order-history");
        setAnchorEl(null);
    };

    const handleWishlist = () => {
        history("/wishlist");
    };
    const navigate = useNavigate();

    const handleItemClick = (id) => {
        navigate(`/detail/${id}`);
    };
    const handleItemDetailClick = () => {
        setIsShow(false);
        setSearchTerm("");
        handleSearch("");
    };

    return (
        <div
            style={{
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                marginBottom: 100,
            }}
        >
            <AppBar
                style={{
                    backgroundColor: "#64BE43",
                    height: 100,
                    justifyContent: "center",
                    paddingLeft: 160,
                }}
            >
                <Toolbar variant="dense">
                    <Link style={{ textDecoration: "none" }} to={"/"}>
                        <img
                            alt=""
                            className="logo"
                            src="http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/logo-robin-white.png"
                        />
                    </Link>
                    <div style={{display: 'flex', marginLeft: 100}}>
                        <Link style={{ textDecoration: "none" }} to={"/intro"}>
                            <p className="category">Giới Thiệu</p>
                        </Link>
                        {/* <ul class="navbar">
                        <li className="bridge">
                            <p
                                className="category"
                                style={{ marginLeft: 0, marginTop: 18 }}
                                href="/birdCage"
                                onClick={() => navigate('/custom')}
                            >
                                Thiết Kế Lồng
                            </p>
                        </li>
                    </ul> */}
                        <Link style={{ textDecoration: "none" }} to={"/custom"}>
                            <p className="category">Thiết Kế Lồng</p>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to={"/birdCage"}>
                            <p className="category">Lồng Chim</p>
                        </Link>
                        {/* <p className="category">Cám Chim</p> */}
                        <Link style={{ textDecoration: "none" }} to={"/accessory"}>
                            <p className="category">Phụ Kiện</p>
                        </Link>
                        {/* <Link style={{ textDecoration: "none" }} to={"/news"}>
                        <p className="category">Tin Tức</p>
                    </Link>
                    <p className="category">Liên Hệ</p> */}
                    </div>

                    <div style={{ marginLeft: 140, display: "flex" }}>
                        <div
                            style={{ width: "200px", position: "relative", marginRight: 15 }}
                        >
                            <input
                                className="inputSearch-header"
                                placeholder="Tìm Kiếm"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                onFocus={() => setIsShow(true)}
                            />
                            {isShow === true ? (
                                <div>
                                    {searchList?.items?.length > 0 ? (
                                        <div className="search-value">
                                            {searchList?.items &&
                                                searchList?.items.map((i) => (
                                                    <Link
                                                        to={`/details/${i.id}`}
                                                        key={i.id}
                                                        onClick={handleItemDetailClick}
                                                    >
                                                        <div className="search-item">
                                                            <img
                                                                style={{
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    marginRight: 20,
                                                                    borderRadius: 10,
                                                                }}
                                                                alt=""
                                                                src={i?.productImages[0]?.imageUrl}
                                                            />
                                                            <span style={{ fontSize: 15 }}>{i?.title}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                        </div>
                                    ) : (
                                        <div className="search-value" style={{ height: '0' }}></div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                        <IconButton color="inherit" onClick={handleSearch}>
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

                        <IconButton color="inherit" onClick={handleCartClick}>
                            <Badge
                                badgeContent={handleTotalProd(totalCountProduct)}
                                color="error"
                            >
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
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                getContentAnchorEl={null}
            >
                {isValid ? <MenuItem onClick={handleDashboard}>Dashboard</MenuItem> : null}
                <MenuItem onClick={handleProfile}>My Account</MenuItem>
                <MenuItem onClick={handleAccount}>Purchase history</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== "backdropClick") {
                        handleClose(event, reason);
                    }
                }}
            >
                <CloseButton onClick={handleClose}>
                    <Close />
                </CloseButton>

                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here
                                </Button>
                            </Box>
                        </>
                    )}

                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} setMode={setMode} MODE={MODE} />

                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.OTP && (
                        <>
                            <OTP closeDialog={handleClose} setMode={setMode} MODE={MODE} />
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
