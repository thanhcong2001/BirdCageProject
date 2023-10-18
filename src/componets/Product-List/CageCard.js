import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Product-List/Cage.css';

const CageCard = ({ product, onAddToCompare }) => {

    const [data, setdata] = useState([])
    useEffect(() => {
        axios.get('https://64ad7733b470006a5ec60159.mockapi.io/cage')
            .then(response => {
                setdata(response.data)
                console.log(response.data)
            })
    }, [])

    return (
        <div>
            <div className="product">
                {
                    data.map(product => {
                        return (
                            <div className='card' key={product.id}>
                                <img src={product.image} alt="" />
                                <h3>{product.name}</h3>
                                <h4>{product.price}</h4>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default CageCard;