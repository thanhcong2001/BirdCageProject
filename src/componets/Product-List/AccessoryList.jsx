import React from 'react';
import PropTypes from 'prop-types';
import CageCard from './CageCard.js';
import '../Product-List/Cage.css'
import AccessoryCard from './AccessoryCard.jsx';

AccessoryList.propTypes = {

};

function AccessoryList(props) {
    return (
        <div>
            <AccessoryCard />
        </div>
    );
}

export default AccessoryList;