import { Box, CircularProgress } from '@mui/material';
import useProduct from 'api/apiProduct/useProduct';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Product-List/Cage.css';
import { Pagination } from 'antd';

const AccessoryCard = () => {
    const [myCar, setMyCar] = useState("Thứ tự mặc định");
    const [list, setList] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const { birdCage, isLoading, isError, birdCageError } = useProduct({ pageIndex: pageIndex });

    const handleChange = (event) => {
        setMyCar(event.target.value)
    }

    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

    if (isError) {
        return <h2>{birdCageError.message}</h2>
    }
    const categoryIdToFilter = 4; // page long chim

    const filteredData = birdCage?.items.filter(item => item.categoryId === categoryIdToFilter);
    console.log('phụ kiện: ', filteredData);

    const handleChangePage = (e) => {
        setPageIndex(() => e - 1)
    }

    return (
        <div>
            <div className="product">
                {isLoading ? <Box sx={{ display: 'flex', height: '500px', alignItems: 'center' }}>
                    <CircularProgress />
                </Box> : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden', marginLeft: 78 }}>
                    {filteredData?.slice(0, 4)?.map(i => (
                        <div key={i?.id} style={{ marginLeft: 20 }}>
                            <Link to={`/details/${i.id}`}>
                                <div className='card'>
                                    <img className='img-birdCage' src={i.productImages[0]?.imageUrl} alt={`hinh cua id ${i.id}`} />
                                    <p className='nameAccessory'>{i.title}</p>
                                    <h4>{convertVND(i.price)}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>}
                <Pagination style={{ textAlign: 'center', marginTop: 20 }} defaultCurrent={1} pageSize={10} total={50} onChange={handleChangePage} />
            </div>
        </div>
    );
};

export default AccessoryCard;