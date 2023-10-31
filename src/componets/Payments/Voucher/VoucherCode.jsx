import { Box } from '@mui/material';
import { Button } from 'antd';
import { clearVoucherCode } from 'componets/ProductCompare/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VoucherCode = () => {
    const { voucherCode } = useSelector(state => state.products)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const handleNavPageVoucher = () => {
        nav('/voucher')
    };

    return (
        <div>
            {voucherCode === null ? (
                <Box sx={{ padding: '10px', border: '1px solid #C4C4C4', borderRadius: '4px' }}>
                    <p>Choose your valid voucher code</p>
                    <Button onClick={handleNavPageVoucher}>Show Voucher Codes</Button>
                </Box>
            ) : (
                <Box sx={{ padding: '10px', border: '1px solid #C4C4C4', borderRadius: '4px' }}>{voucherCode} <span><Button onClick={() => dispatch(clearVoucherCode())}>Chọn mã khác</Button></span></Box>
            )}
        </div>
    );
};

export default VoucherCode;
