import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Tag } from 'antd';
import useFetchOrder from './useFetchOrder';
import usePostApproveOrder from './usePostApproveOrder';
import usePostShipApprove from './usePostShipOrder';


const OrderForm = ({ tableOrder }) => {

    const { order } = useFetchOrder()

    const { approveOrder, approveOrderPending } = usePostApproveOrder()
    const { shipOrder, shipOrderPending } = usePostShipApprove()

    if (!tableOrder || !order) {
        return <div>Loading...</div>
    }
    const orderData = order.items

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

    const handleApprove = async (id) => {
        await approveOrder(id)
    }
    const handleShipOrder = async (id) => {
        await shipOrder(id)
    }

    const EmptyF = () => {
        return <Box sx={{ display: 'flex', height: '100px' }} >
            <p>Empty</p>
        </Box>
    }

    return (
        <div style={{ marginLeft: 100, height: '90vh' }}>
            <div>
                <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Order Management</p>
                <div style={{ display: 'flex' }}>
                    <input className='inputSearch-Dashboard' placeholder='Tìm kiếm ...' />
                    <button style={{ backgroundColor: '#64be43' }}>
                        <SearchIcon style={{ height: 15 }} />
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '50%', overflow: 'scroll', height: '85vh' }}>
                        <Typography variant="h6" color={'Highlight'}>Pending order waiting for action</Typography>
                        <div className='borderTable-Dashboard'>
                            {orderData.filter(i => i.orderStatus === 'Pending').length < 1 ? <EmptyF /> :
                                <table>
                                    <thead>
                                        <tr>
                                            {tableOrder.map((order, index) => (
                                                <th key={index}>{order}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderData
                                            .filter(i => i.orderStatus === 'Pending')
                                            .map(i => (
                                                <tr key={i.id}>
                                                    <td>{i.id}</td>
                                                    <td>{i.nameRecieved}</td>
                                                    <td>{i.totalPrice}</td>
                                                    <td>{i.phoneNumber}</td>
                                                    <td>{i.paymentStatus}</td>
                                                    <td>
                                                        <Tag color={getStatusTagColor(i.orderStatus)} key={i.orderStatus}>
                                                            {i.orderStatus}
                                                        </Tag>
                                                    </td>
                                                    <td>
                                                        <button style={{ marginRight: 20, backgroundColor: 'green' }} onClick={() => handleApprove(i.id)}>Approve</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            }
                        </div>
                        <Typography variant="h6" color={'green'} >Approved order</Typography>
                        <div className='borderTable-Dashboard'>
                            {approveOrderPending ?
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '774px', height: '200px' }}>
                                    <CircularProgress size={20} color='inherit' sx={{}} />
                                </Box>
                                : <table>
                                    <thead>
                                        <tr>
                                            {tableOrder.map((order, index) => (
                                                <th key={index}>{order}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    {orderData.filter(i => i.orderStatus === 'Approved').length < 1 ? <EmptyF /> :
                                        <tbody>
                                            {orderData
                                                .filter(i => i.orderStatus === 'Approved')
                                                .map(i => (
                                                    <tr key={i.id}>
                                                        <td>{i.id}</td>
                                                        <td>{i.nameRecieved}</td>
                                                        <td>{i.totalPrice}</td>
                                                        <td>{i.phoneNumber}</td>
                                                        <td>{i.paymentStatus}</td>
                                                        <td>
                                                            <Tag color={getStatusTagColor(i.orderStatus)} key={i.orderStatus}>
                                                                {i.orderStatus}
                                                            </Tag>
                                                        </td>
                                                        <td>
                                                            <button style={{ marginRight: 20, backgroundColor: 'blue' }} onClick={() => handleShipOrder(i.id)}>Ship</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>}

                                </table>}

                        </div>
                        <Typography variant="h6" color={'blue'} >Shiped order</Typography>
                        <div className='borderTable-Dashboard'>
                            {shipOrderPending ?
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '774px', height: '200px' }}>
                                    <CircularProgress size={20} color='inherit' sx={{}} />
                                </Box>
                                : <table>
                                    <thead>
                                        <tr>
                                            {tableOrder.map((order, index) => (
                                                <th key={index}>{order}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    {orderData.filter(i => i.orderStatus === 'Shipped').length < 1 ? <EmptyF /> : <tbody>
                                        {orderData
                                            .filter(i => i.orderStatus === 'Shipped')
                                            .map(i => (
                                                <tr key={i.id}>
                                                    <td>{i.id}</td>
                                                    <td>{i.nameRecieved}</td>
                                                    <td>{i.totalPrice}</td>
                                                    <td>{i.phoneNumber}</td>
                                                    <td>{i.paymentStatus}</td>
                                                    <td>
                                                        <Tag color={getStatusTagColor(i.orderStatus)} key={i.orderStatus}>
                                                            {i.orderStatus}
                                                        </Tag>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>}

                                </table>}

                        </div>
                    </div>
                    <div style={{ width: '50%', overflow: 'scroll', height: '85vh' }}>
                        <Typography variant="h6" color={'red'}>Canceled order</Typography>
                        <div className='borderTable-Dashboard'>
                            <table>
                                <thead>
                                    <tr>
                                        {tableOrder.map((order, index) => (
                                            <th key={index}>{order}</th>
                                        ))}
                                    </tr>
                                </thead>
                                {orderData.filter(i => i.orderStatus === 'Canceled').length < 1 ? <EmptyF /> :
                                    <tbody>
                                        {orderData
                                            .filter(i => i.orderStatus === 'Canceled')
                                            .map(i => (
                                                <tr key={i.id}>
                                                    <td>{i.id}</td>
                                                    <td>{i.nameRecieved}</td>
                                                    <td>{i.totalPrice}</td>
                                                    <td>{i.phoneNumber}</td>
                                                    <td>{i.paymentStatus}</td>
                                                    <td>
                                                        <Tag color={getStatusTagColor(i.orderStatus)} key={i.orderStatus}>
                                                            {i.orderStatus}
                                                        </Tag>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>}

                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default OrderForm