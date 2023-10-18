import React from 'react';
import PropTypes from 'prop-types';
import CageCard from './CageCard.js';
import '../Product-List/Cage.css'

CageList.propTypes = {

};

function CageList(props) {
    return (
        <div>
                <CageCard />
        </div>
    );
}

export default CageList;