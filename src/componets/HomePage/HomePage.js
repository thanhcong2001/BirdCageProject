import React from 'react';
import Banner from '../Banner/Banner';
import Cage from '../Product-List/Cage';
import '../HomePage/HomePage.css';
import CageList from '../Product-List/CageList.jsx';
import Information from './Information.jsx';

HomePage.propTypes = {

};

function HomePage() {
    return (
        <div style={{ padding: '0 0 50px 0', margin: 0 }}>
            <Banner/>
            <h1 className="title_home">Lồng chim</h1>
            <div className="list"><CageList /></div>
            <h1 className="title_home">Lồng chim</h1>
            <div className="list"><CageList /></div>
            <h1 className="title_home">Lồng chim</h1>
            <div className="list"><CageList /></div>
            <h1 className="title_home">Thông tin hữu ích</h1>
            <div className="list"><Information /></div>
        </div>
    );
}

export default HomePage;