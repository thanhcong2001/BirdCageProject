import React, { useState, useEffect } from 'react';
import '../Product-List/Cage.css'
import axios from 'axios'
const Cage = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        axios.get('https://6509117cf6553137159aecfc.mockapi.io/api/v1/Cage')
            .then(res => {
                setdata(res.data)
            })
    }, [])

    return (
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',marginLeft:65}}>
            {data.slice(0,8).map(i => (
                <div>
                    <div className='card'>
                        <img style={{width:284}} src={i.img} alt="" />
                        <p className='nameCage'>{i.name}</p>
                        <h4>{i.price}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cage;