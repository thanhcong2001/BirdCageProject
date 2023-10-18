import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../News/News.css'
import axios from 'axios'

NewsCard.propTypes = {

};

function NewsCard(props) {

    const [data, setdata] = useState([])
    useEffect(() => {
        axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
            .then(response => {
                setdata(response.data)
            })
    }, [])

    return (
        <div className='news'>
            {
                data.map(item => (
                    <div className='newsDiv' key={item?.id}>
                        <img className='newsImage' src={item?.img} />
                        <p className='titleNews'> {item.title}</p>
                        <div className='lineBlog' style={{ marginLeft: 20 }}></div>
                        <p className='desNews'>{item.description}</p>
                        <div className='line'></div>
                    </div>
                ))
            }
        </div>
    );
}

export default NewsCard;