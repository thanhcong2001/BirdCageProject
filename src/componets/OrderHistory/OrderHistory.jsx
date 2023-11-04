import { Table, Tag, Space, Button, Pagination } from 'antd';
import { DateTime } from 'luxon';
import useOrderUser from './useOrderUser';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useState } from 'react';
const { Column } = Table;


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



const OrderHistory = () => {
    const [defaultPageIndex, setDefaultPageIndex] = useState(0)
    const nav = useNavigate()
    const { orderUser } = useOrderUser(defaultPageIndex)

    const handleChangePage = (e) => {
        setDefaultPageIndex(() => e - 1)
    }

    return (
        <>
            <Typography title='hello' align='center' variant='h3'>YOUR ORDER</Typography>
            <Table dataSource={orderUser?.items} style={{ width: '80%', margin: '0 auto' }} pagination={{
                total: orderUser?.totalItemsCount,
                pageSize: 10,
                defaultCurrent: 1,
                onChange: handleChangePage
            }}>
                <Column align='center' title="ID" dataIndex="id" key="id" />
                <Column align='center' title="Street Address" dataIndex="streetAddress" key="streetAddress" />
                <Column align='center' title="City" dataIndex="city" key="city" />
                <Column align='center' title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                <Column
                    align='center'
                    title="Order Date"
                    dataIndex="orderDate"
                    key="orderDate"
                    render={(orderDate) => (
                        <>
                            {convertDate(orderDate)}
                        </>
                    )} />
                <Column
                    align='center'
                    title="Order Status"
                    dataIndex="orderStatus"
                    key="orderStatus"
                    render={(orderStatus) => (
                        <>
                            <Tag color={getStatusTagColor(orderStatus)} key={orderStatus}>
                                {orderStatus}
                            </Tag>
                        </>
                    )}
                />

                <Column
                    align='center'
                    title="Action"
                    key="action"
                    render={(data) => (
                        <Space size="middle">
                            <Button onClick={() => nav(`/user/order-history/${data?.id}`)}>View detail</Button>
                        </Space>
                    )}
                />
            </Table>
            {/* <Pagination onChange={handleChangePage} pageSize={10} defaultCurrent={1} total={50} /> */}
        </>
    )
}

export default OrderHistory


