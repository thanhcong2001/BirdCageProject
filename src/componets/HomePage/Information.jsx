import axios from 'axios';
import { useEffect, useState } from 'react';
import '../HomePage/HomePage.css';

Information.propTypes = {

};

function Information(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('https://6507a9f63a38daf4803fa131.mockapi.io/api/v1/birdCage')
            .then(response => {
                setData(response.data)
            })
    }, [])

    return (
        <div>
            <div className='information'>
                {
                    data.slice(0, 4).map(item => (
                        <div className='newsDiv' key={item?.id}>
                            <img className='newsImage' src={item?.img} alt='logo' />
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