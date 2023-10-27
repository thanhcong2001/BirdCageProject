import useFetchOrderById from 'api/apiProduct/useFetchOrderById'
import React from 'react'
import { useParams } from 'react-router-dom'
import './orderDetail.css'
import { Box, CircularProgress } from '@mui/material'
import { DateTime } from 'luxon'
import { Tag } from 'antd'
const OrderDetailUser = () => {

    const { orderId } = useParams()
    const shippingFee = 30000

    const { orderDetail, isLoading } = useFetchOrderById(orderId)

    console.log(orderDetail)

    const convertDate = (date) => {
        const dateTime = DateTime.fromISO(date);
        const formattedDateTime = dateTime.toFormat('dd/MM/yyyy HH:mm:ss');
        return formattedDateTime
    }
    const getStatusTagColor = (orderStatus) => {
        switch (orderStatus) {
            case 'Pending':
                return 'yellow';
            case 'Approved':
                return 'green';
            case 'Shiped':
                return 'blue';
            default:
                return 'blue';
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', height: '500px', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='container-order-detail'>
            <div className="top-block">
                <div className='order-detail'>
                    <div className="order-title">
                        <h2>Thông tin đơn hàng</h2>
                        <table style={{ width: '95%', border: '1px solid black', borderCollapse: 'collapse' }}>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>ID</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.id}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>Ngày đặt hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{convertDate(orderDetail.orderDate)}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}> Trang thái đơn hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>
                                    <Tag color={getStatusTagColor(orderDetail.orderStatus)} key={orderDetail.orderStatus}>
                                        {orderDetail.orderStatus}
                                    </Tag>
                                </td>
                            </tr >
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>Giá trị đơn hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.totalPrice + shippingFee} VNĐ</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='shipping-detail'>
                    <div className="shipping-title">
                        <h2>Thông tin giao hàng</h2>
                        <table style={{ width: '95%', border: '1px solid black', borderCollapse: 'collapse' }}>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>Tên người nhận</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.nameRecieved}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>Số điện thoại nhận hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.phoneNumber}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>Địa chỉ nhận hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.streetAddress}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left' }}>Phương thức thanh toán</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.paymentStatus}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="bottom-block">
                <div className="prod-detail">
                    <h2>Sản phẩm đã mua</h2>
                    <table style={{ width: '100%' }}>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Tổng tiền</th>
                        </tr>
                        {orderDetail.details.map((data, index) => (
                            <tr key={index}>
                                <td>{data.orderId}</td>
                                <td>{data.productTitle}</td>
                                <td>{data.price}</td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailUser