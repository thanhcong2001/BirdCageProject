import useFetchOrderById from 'api/apiProduct/useFetchOrderById'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './orderDetail.css'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { Tag } from 'antd'
import CancelOrder from './CancelOrder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSnackbar } from 'notistack'
const OrderDetailUser = () => {
    const token = localStorage.getItem('token');
    const formattedToken = token?.replace(/"/g, '');
    const headers = {
        Authorization: `Bearer ${formattedToken}`
    }
    const { orderId } = useParams()
    const shippingFee = 30000

    const { orderDetail, isLoading } = useFetchOrderById(orderId)

    console.log(formattedToken)

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
            case 'Canceled':
                return 'red';
            default:
                return 'blue';
        }
    };
    const deleteFunc = (id) => {
        return axios.put(`http://tainguyen58-001-site1.ftempurl.com/api/User/cancel-order/${id}`, {}, { headers })
    }
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient()
    const deleteOrder = useMutation({
        mutationFn: deleteFunc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orderUser'] })
            enqueueSnackbar("Hủy đơn hàng thành công", { variant: 'info' })
        },
        onError: (error) => {
            enqueueSnackbar(error, { variant: 'error' })
        }
    });

    const handleClickCancelOrder = () => {
        deleteOrder.mutate(orderId)
    }

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
                        <table style={{ width: '95%', border: '2px solid #E4E1E1', borderCollapse: 'collapse' }}>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>ID</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.id}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>Ngày đặt hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{convertDate(orderDetail.orderDate)}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}> Trạng thái đơn hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>
                                    <Tag color={getStatusTagColor(orderDetail.orderStatus)} key={orderDetail.orderStatus}>
                                        {orderDetail.orderStatus}
                                    </Tag>
                                </td>
                            </tr >
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>Giá trị đơn hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.totalPrice + shippingFee} VNĐ</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='shipping-detail'>
                    <div className="shipping-title">
                        <h2>Thông tin giao hàng</h2>
                        <table style={{ width: '95%', border: '2px solid #E4E1E1', borderCollapse: 'collapse' }}>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>Tên người nhận</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.nameRecieved}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>Số điện thoại nhận hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.phoneNumber}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>Địa chỉ nhận hàng</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.streetAddress}</td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <th style={{ padding: '5px', textAlign: 'left', borderRight: '2px solid #E4E1E1' }}>Phương thức thanh toán</th>
                                <td style={{ padding: '5px', textAlign: 'left' }}>{orderDetail.paymentStatus}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="bottom-block">
                <div className="prod-detail">
                    <h2>Sản phẩm đã mua</h2>
                    <table style={{ width: '100%', border: '2px solid #E4E1E1' }}>
                        <tr>
                            <th style={{ border: '2px solid #E4E1E1' }}>ID</th>
                            <th style={{ border: '2px solid #E4E1E1' }}>Tên</th>
                            <th style={{ border: '2px solid #E4E1E1' }}>Tổng tiền</th>
                        </tr>
                        {orderDetail.details.map((data, index) => (
                            <tr key={index}>
                                <td style={{ border: '2px solid #E4E1E1' }}>{data.orderId}</td>
                                <td style={{ border: '2px solid #E4E1E1' }}>{data.productTitle}</td>
                                <td style={{ border: '2px solid #E4E1E1' }}>{data.price}</td>
                            </tr>
                        ))}

                    </table>
                </div>
                <CancelOrder orderDetail={orderDetail} handleClickCancelOrder={handleClickCancelOrder} loading={deleteOrder.isPending} />
            </div>
        </div>
    )
}

export default OrderDetailUser