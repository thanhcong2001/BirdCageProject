import { Box, CircularProgress } from '@mui/material';
import useProduct from 'api/apiProduct/useProduct';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Product-List/Cage.css';
import { Pagination } from 'antd';

const CageCard = () => {
    const navigate = useNavigate()
    const [myCar, setMyCar] = useState("Thứ tự mặc định");
    const [list, setList] = useState([])
    const [compareList, setCompareList] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const { birdCage, isLoading, isError, birdCageError } = useProduct({ pageIndex: pageIndex });
    const [tmpList, setTmpList] = useState([1, 2, 3])
    const [disabledButtons, setDisabledButtons] = useState([]);

    if (isError) {
        return <h2>{birdCageError.message}</h2>
    }
    const categoryIdToFilter = 1; // page long chim

    const filteredData = birdCage?.items.filter(item => item.categoryId === categoryIdToFilter);

    function convertVND(price) {
        if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        else return 0
    }

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
                        <div key={i?.id}>
                            <div className='card'>
                                <img className='img-birdCage' src={i.productImages[0]?.imageUrl} alt={`hinh cua id ${i.id}`} onClick={() => navigate(`/details/${i.id}`)} />
                                <p className='nameBirdCage'>{i.title}</p>
                                <h3 className='discount'>{convertVND(i.price)}</h3>
                                <h4 className='price'>{convertVND(i.priceAfterDiscount)}</h4>
                                {/* <button onClick={() => addItemToCompareList(i)} disabled={disabledButtons.includes(i.id)}>So sánh</button> */}
                            </div>
                        </div>
                    ))}
                </div>}
                {/* <Pagination style={{ textAlign: 'center', marginTop: 20 }} defaultCurrent={1} pageSize={10} total={50} onChange={handleChangePage} /> */}
            </div>
        </div>
    );
};

export default CageCard;