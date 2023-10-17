import './App.css';

import { Intro } from './componets/Intro/Intro';
import { News } from './componets/News/News';
import  {Routes, Route} from 'react-router-dom'

import { Footer } from './componets/Footer/Footer';
import HomePage from './componets/HomePage/HomePage';
import { BirdCage } from './componets/BirdCage/BirdCage';
import Cart from './componets/Cart/Cart.jsx';
import Details from 'componets/Details/Details.js';
import Header from 'componets/Header/Header.js';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/intro' element={<Intro/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/birdCage' element={<BirdCage/>}/>
      <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
