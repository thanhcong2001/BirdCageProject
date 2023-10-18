import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { useState } from 'react';
import '../HomePage/HomePage.css';

Information.propTypes = {

};

function Information(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
            .then(response => {
                setData(response.data)
                console.log(response.data)
            })
    }, [])

    return (
        <div>
            <div className='information'>
                {
                    data.slice(0,4).map(item => (
                        <div className='newsDiv' key={item?.id}>
                            <img className='newsImage' src={item?.img} />
                            <p className='titleNews'> {item.title}</p>
                            <p className='desNews'>{item.description}</p>
                            <div className='line'></div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Information;