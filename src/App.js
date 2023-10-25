import './App.css';
import { Cart } from './componets/Cart/Cart';
import { DesignCage } from './componets/DesignCage/DesignCage';
import { Intro } from './componets/Intro/Intro';
import { News } from './componets/News/News';
import { Routes, Route } from 'react-router-dom'
import { Footer } from './componets/Footer/Footer';
import HomePage from './componets/HomePage/HomePage';
import { BirdCage } from './componets/BirdCage/BirdCage';
import Details from 'componets/Details/Details.js';
import Header from 'componets/Header/Header.js';
import Setting from './componets/Setting/Setting'
import { SearchResult } from 'componets/Search/SearchResult';
import { Dashboard } from 'componets/Dashboard/Dashboard';
function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/news' element={<News />} />
        <Route path='/details' element={<Details />} />
        <Route path='/birdCage' element={<BirdCage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/designCage' element={<DesignCage />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/searchResult' element={<SearchResult />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
