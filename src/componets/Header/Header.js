import React from 'react'
import { AppBar, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import '../Header/Header.css'
import { Link, useNavigate } from 'react-router-dom';
export const Header = () => {
    const navigate = useNavigate()
    return (
        <div style={{ marginBottom: 102 }}>
            <AppBar style={{ backgroundColor: '#64BE43', height: 100, justifyContent: 'center', paddingLeft: 120 }}>
                <Toolbar variant="dense" >
                    <Link style={{ textDecoration: 'none' }} to={'/'}><img className='logo' src='http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/logo-robin-white.png' /></Link>
                    <p className='category'>Giới Thiệu</p>
                    <ul class="navbar">
                        <li className='bridge'>
                            <p className='category' style={{marginLeft:0}} href="#">Thiết Kế Lồng</p>
                            <ul className='list1'>
                                <li className='parent2'>
                                    <a href="">Web Development</a>
                                    <ul className='list2'>
                                        <li><a onClick={() => navigate('/designCage')}>PHP</a></li>
                                        <li><a href="#">HTML/CSS</a></li>
                                        <li><a href="#">JavaScript</a></li>
                                    </ul>
                                </li>
                                <li className='parent2'>
                                    <a href="">Mobile Development</a>
                                    <ul className='list2'>
                                        <li><a href="#">Andriod Apps</a></li>
                                        <li><a href="#">iOS Apps</a></li>
                                    </ul>
                                </li>
                                <li className='parent2'>
                                    <a href="">Hosting Services</a>
                                    <ul className='list2'>
                                        <li><a href="#">Dedicated Server</a></li>
                                        <li><a href="#">Reseller Hosting</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p className='category'>Gà Cảnh</p>
                    <Link style={{ textDecoration: 'none' }} to={'/birdCage'}><p className='category'>Lồng Chim</p></Link>
                    <p className='category'>Cám Chim</p>
                    <p className='category'>Phụ Kiện</p>
                    <Link style={{ textDecoration: 'none' }} to={'/news'}><p className='category'>Tin Tức</p></Link>
                    <p className='category'>Liên Hệ</p>
                    <div style={{ marginLeft: 80 }}>
                        <SearchIcon style={{ marginRight: 15, marginLeft: 20 }} />
                        <PersonIcon style={{ marginRight: 15 }} />
                        <LocalMallIcon />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
