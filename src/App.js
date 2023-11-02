import './App.css';
import { Cart } from './componets/Cart/Cart';
import { DesignCage } from './componets/DesignCage/DesignCage';
import { Intro } from './componets/Intro/Intro';
import { News } from './componets/News/News';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Footer } from './componets/Footer/Footer';
import HomePage from './componets/HomePage/HomePage';
import { BirdCage } from './componets/BirdCage/BirdCage';
import Details from 'componets/Details/Details.js';
import Header from 'componets/Header/Header.js';
import Setting from './componets/Setting/Setting'
import { SearchResult } from 'componets/Search/SearchResult';
import { Dashboard } from 'componets/Dashboard/Dashboard';
import Payments from 'componets/Payments/Payments';
import OrderHistory from 'componets/OrderHistory/OrderHistory';
import OrderDetailUser from 'componets/OrderDetailUser/OrderDetailUser';
import Wishlist from 'componets/Wishlist/Wishlist';
import { useEffect, useState } from 'react';
import Compare from 'componets/Compare/Compare';
import { Accessory } from 'componets/Accessory/Accessory';
import PaymentMethod from 'componets/Payments/PaymentMethod';
import ResetPassword from 'componets/Auth/components/ResetPassword/ResetPassword';
import VoucherPage from 'componets/Payments/Voucher/VoucherPage';
import axios from 'axios';
import CustomCage from 'componets/Customize/CustomCage';
function App() {
  const { jwtDecode } = require('jwt-decode');
  const [authen, setAuthen] = useState(null)
  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token') || null
    setAuthen(token)
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      const apiUrl = `http://tainguyen58-001-site1.ftempurl.com/api/User/${userId}`;
      axios.get(apiUrl)
        .then(response => {
          setData(response.data);
          console.log("Data: ", response.data.role);
          if (response.data?.role && response.data?.role == 'Manager') return navigate('/dashboard')
          return navigate('/intro')
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  }, [])

  return (
    <div className='App'>
      {/* {data.role === 'Customer' ? '' : <Header />} */}
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/voucher' element={<VoucherPage />} />
        <Route path='/news' element={<News />} />
        <Route path='/cart/payment' element={<Payments />} />
        <Route path='/cart/payment/payment-methods' element={<PaymentMethod />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/birdCage' element={<BirdCage />} />
        <Route path='/accessory' element={<Accessory />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='/designCage' element={<DesignCage />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/searchResult' element={<SearchResult />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user/order-history' element={<OrderHistory />} />
        <Route path='/user/order-history/:orderId' element={<OrderDetailUser />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/custom' element={<CustomCage />} />
      </Routes>
      {/* {data.role === 'Manager' ? '' : <Footer />} */}
      <Footer />
    </div>
  );
}

export default App;
