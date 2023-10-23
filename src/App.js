import './App.css';
import { Cart } from './componets/Cart/Cart';
import { DesignCage } from './componets/DesignCage/DesignCage';
import { Intro } from './componets/Intro/Intro';
import { News } from './componets/News/News';
import  {Routes, Route} from 'react-router-dom'
import { Footer } from './componets/Footer/Footer';
import HomePage from './componets/HomePage/HomePage';
import { BirdCage } from './componets/BirdCage/BirdCage';
import Details from 'componets/Details/Details.js';
import Header from 'componets/Header/Header.js';
import Payments from 'componets/Payments/Payments';
import OrderHistory from 'componets/OrderHistory/OrderHistory';
import OrderDetailUser from 'componets/OrderDetailUser/OrderDetailUser';
 
function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/news' element={<News />} />
        <Route path='/cart/payment' element={<Payments />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/birdCage' element={<BirdCage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/designCage' element={<DesignCage />} />
        <Route path='/user/order-history' element={<OrderHistory />} />
        <Route path='/user/order-history/:orderId' element={<OrderDetailUser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
