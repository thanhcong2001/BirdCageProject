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
                    <Link style={{ textDecoration: 'none' }} to={'/intro'}>
                        <p className='category'>Giới Thiệu</p>
                    </Link>
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
                    <p className='category'>Chim Cảnh</p>
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
