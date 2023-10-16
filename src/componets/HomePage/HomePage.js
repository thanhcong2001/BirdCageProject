import React from 'react';
import Banner from '../Banner/Banner';
import Cage from '../Product-List/Cage';
import '../HomePage/HomePage.css';

HomePage.propTypes = {

};

function HomePage() {
    return (
        <div>
            <Banner />
            <p className='homePage-title'>Lồng chim</p>
            <p></p>
            <div className='list'>
                <Cage />
            </div>
        </div>
    );
}

export default HomePage;