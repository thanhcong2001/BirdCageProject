import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Radio, Space } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import usePayment from './usePayment';
const PaymentMethod = () => {
    const token = localStorage.getItem('token');
    const dataPay = useSelector(state => state.cart.checkoutInformation)
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const { checkout, isLoading } = usePayment()

    const handleCODPayment = async () => {
        const { phone, streetAddress, city, name, vourcherCode } = dataPay;
        const infoS = {
            phone,
            streetAddress,
            city,
            name,
            paymentMethod: 'COD',
        };
        if (vourcherCode) {
            infoS.vourcherCode = vourcherCode;
        }
        try {
            await checkout(infoS);
        } catch (error) {
            console.log('Failed to process COD payment', error);
        }
    };
    const handleCardPayment = async () => {
        const { phone, streetAddress, city, name, vourcherCode } = dataPay;
        const infoS = {
            phone,
            streetAddress,
            city,
            name,
            paymentMethod: 'PAYONLINE',
        };
        if (vourcherCode) {
            infoS.vourcherCode = vourcherCode;
        }
        try {
            await checkout(infoS);
        } catch (error) {
            console.log('Failed to process Card payment', error);
        }
    };

    const handleSubmit = async () => {
        if (value === 1) {
            await handleCODPayment()
        } else {
            await handleCardPayment()
        }

    }
    if (!token) {
        return <div>
            You can not go here
        </div>
    }

    if (!dataPay) {
        return <p>Loading...</p>
    }
    return (
        <Box sx={{
            margin: '0 auto',
            // backgroundColor: 'red',
            height: '70vh',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            minWidth: '540px',
            gap: '20px'
        }}>
            <Typography>Cảm ơn <strong>{dataPay.name}</strong> đã cho Mona Shop cơ hội được phục vụ</Typography>
            <Box sx={{
                backgroundColor: '#F5F5F7',
                borderRadius: 2,
                padding: '10px'
            }}>
                <Typography>Đơn hàng của bạn: </Typography>
                <Box>
                    <ul>
                        <li style={{ paddingBottom: '10px' }}>Người nhận: {dataPay.name}, {dataPay.phone}</li>
                        <li style={{ paddingBottom: '10px' }}>Giao đến: {dataPay.streetAddress}</li>
                        <li>Tổng tiền: {dataPay.totalPriceAfterShip} VNĐ</li>
                    </ul>
                </Box>
            </Box>
            <Box sx={{
                border: 'dashed 2px orange',
                borderRadius: 2,
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#FFF8F5'
            }}>
                <Typography color={'orange'}>Đơn hàng chưa được thanh toán</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <Typography>
                    <strong>Chọn hình thức thanh toán:</strong>
                </Typography>
                <Box>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={1}>Thanh toán tiền mặt khi nhận hàng (COD)</Radio>
                            <Radio value={2}>Thanh toán với Card</Radio>
                        </Space>
                    </Radio.Group>
                </Box>
                <Box sx={{
                    margin: '0 auto',
                    width: '80%',
                    marginTop: '50px'
                }}>
                    {isLoading ?
                        <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ opacity: 0.5 }}>
                            <CircularProgress size={20} color='inherit' />
                        </Button> : <Button onClick={handleSubmit} fullWidth variant="contained" >
                            Xác nhận
                        </Button>}


                </Box>
            </Box>
        </Box>
    )
}

export default PaymentMethod