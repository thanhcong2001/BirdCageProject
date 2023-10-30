import { Table, Tag, Space, Button } from 'antd';
import { DateTime } from 'luxon';
import useOrderUser from './useOrderUser';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
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
    const nav = useNavigate()
    const { orderUser } = useOrderUser()
    return (
        <>
            <Typography title='hello' align='center' variant='h3'>YOUR ORDER</Typography>
            <Table dataSource={orderUser?.items} style={{ width: '80%', margin: '0 auto' }}>
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
                            <Button onClick={() => nav(`${data?.id}`)}>View detail</Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}

export default OrderHistory


