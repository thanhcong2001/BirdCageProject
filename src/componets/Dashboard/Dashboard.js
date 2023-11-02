import React, { useState, useEffect } from 'react'
import '../Dashboard/Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { format } from 'date-fns';
import OrderForm from './OrderForm/OrderForm';
import axiosClient from 'api/axiosClient';
import apiClient from 'api/apiClient';
export const Dashboard = () => {
  const [data, setdata] = useState([])
  const [productData, setProductData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [voucherData, setVoucherData] = useState([])
  useEffect(() => {
    fetchUsers()
    apiClient.get('Product/page?pageIndex=0&pageSize=10')
      .then(response => {
        setProductData(response.data?.items)
      })
    apiClient.get('Order/page?pageIndex=1&pageSize=10')
      .then(response => {
        setOrderData(response.data?.items)
      })
    apiClient.get('Voucher')
      .then(response => {
        setVoucherData(response.data)
      })
  }, [])
  const tableHeaders = ['Name', 'Email', 'Gender', 'Phone Number', 'Birth Date', 'Status', 'Action'];
  const tableProduct = ['ID', 'Name', 'Image', 'Price', 'Price Discount', 'Discount', 'Sku', 'Status', 'Action'];
  const tableOrder = ['ID', , 'Name Recieved', 'Price', 'Phone', 'Payment Status', 'Order Status', 'Action'];
  const tableVoucher = ['ID', 'Voucher Code', 'Discount Percent', 'start Date', 'Expiration Date', 'Status', 'Action'];

  const fetchUsers = () => {
    apiClient.get('User')
    .then(response => {
      setdata(response.data)
    })
  }
  const handleEdit = (id) => {
    apiClient.put(`User/recover/${id}`)
      .then((response) => {
        if (response.status === 200) {
        } else {
          console.error('Edit không thành công');
        }
      })
      .catch((error) => {
        console.error('Lỗi kết nối', error);
      });
  };
  const handleDelete = (id) => {
    console.log('Id: ', id);
    apiClient.delete(`http://tainguyen58-001-site1.ftempurl.com/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchUsers()
        } else {
          console.error('Xóa không thành công');
        }
      })
      .catch((error) => {
        console.error('Lỗi kết nối', error);
      });
  };
  const [showUserForm, setShowUserForm] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showVoucherForm, setShowVoucherForm] = useState(false);
  const toggleUserForm = () => {
    setShowUserForm(true);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(false)
  };
  const toggleProductForm = () => {
    setShowOrderForm(false)
    setShowUserForm(false);
    setShowProductForm(true);
    setShowVoucherForm(false)
  };
  const toggleOrderForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(true);
    setShowVoucherForm(false)
  };
  const toggleVoucherForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(true);
  };
  function UserForm() {
    return (
      <div style={{ marginLeft: 100 }}>
        <div>
          <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>User Management</p>
          <div style={{ display: 'flex' }}>
            <input className='inputSearch-Dashboard' placeholder='Tìm kiếm ...' />
            <button style={{ backgroundColor: '#64be43' }}>
              <SearchIcon style={{ height: 15 }} />
            </button>
          </div>
          <div className='borderTable-Dashboard'>
            <table>
              <thead>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(i => (
                  <tr key={i.id}>
                    <td>{i.userName}</td>
                    <td>{i.email}</td>
                    <td>{i.gender}</td>
                    <td>{i.phoneNumber ? i.phoneNumber.replace(/'/g, '') : ''}</td>
                    <td>{format(new Date(i.doB), 'dd/MM/yyyy')}</td>
                    <td>{i.isDelete ? "Deactive" : "Active"}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={() => handleEdit(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(i.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  function ProductForm() {
    const [showPopup, setShowPopup] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const openPopup = () => {
      setShowPopup(true);
    };
    const closePopup = () => {
      setShowPopup(false);
    };
    const openAddNew = () => {
      setShowAdd(true);
    };
    const closeAddNew = () => {
      setShowAdd(false);
    };
    return (
      <div style={{ marginLeft: 100 }}>
        <div>
          <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Product Management</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <input className='inputSearch-Dashboard' placeholder='Tìm kiếm ...' />
              <button style={{ backgroundColor: '#64be43' }}>
                <SearchIcon style={{ height: 15 }} />
              </button>
            </div>
            <div>
              <button onClick={openAddNew} style={{ backgroundColor: '#64be43' }}>
                Add Product
              </button>
            </div>
          </div>
          <div className='borderTable-Dashboard'>
            <table>
              <thead>
                <tr>
                  {tableProduct.map((product, index) => (
                    <th key={index}>{product}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productData.slice(0, 6).map(i => (
                  <tr key={i?.id}>
                    <td>{i?.id}</td>
                    <td>{i?.title}</td>
                    <td><img style={{ width: 40, height: 40 }} src={i?.productImages[0]?.imageUrl} /></td>
                    <td>{i?.price}</td>
                    <td>{i?.priceAfterDiscount}</td>
                    <td>{i?.sku}</td>
                    <td>Iron Cage</td>
                    <td>{i.isDelete ? "Deactive" : "Active"}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={openPopup}>Edit</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(i.items.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="App-dash">
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>
                  &times;
                </span>
                <h2 style={{ marginBottom: 30 }}>Edit Product</h2>
                <form className='formEdit-Product'>
                  <input className='inputEdit-Product' type="text" placeholder="Name" />
                  <input className='inputEdit-Product' type="email" placeholder="Image" />
                  <input className='inputEdit-Product' type="text" placeholder="Price" />
                  <input className='inputEdit-Product' type="email" placeholder="Price Discount" />
                  <input className='inputEdit-Product' type="text" placeholder="Discount" />
                  <input className='inputEdit-Product' type="email" placeholder="Sku" />
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <button style={{ marginRight: 30 }} type="submit">Submit</button>
                  <button style={{ backgroundColor: 'red' }} onClick={closePopup} type="submit">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="App-dash">
          {showAdd && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={closeAddNew}>
                  &times;
                </span>
                <h2 style={{ marginBottom: 30 }}>Create Product</h2>
                <form className='formEdit-Product'>
                  <input className='inputEdit-Product' type="text" placeholder="Name" />
                  <input className='inputEdit-Product' type="email" placeholder="Image" />
                  <input className='inputEdit-Product' type="text" placeholder="Price" />
                  <input className='inputEdit-Product' type="email" placeholder="Price Discount" />
                  <input className='inputEdit-Product' type="text" placeholder="Discount" />
                  <input className='inputEdit-Product' type="email" placeholder="Sku" />
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <button style={{ marginRight: 30 }} type="submit">Submit</button>
                  <button style={{ backgroundColor: 'red' }} onClick={closePopup} type="submit">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function VoucherForm() {
    return (
      <div style={{ marginLeft: 100 }}>
        <div>
          <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Voucher Management</p>
          <div style={{ display: 'flex',justifyContent:'space-between' }}>
            <div>
              <input className='inputSearch-Dashboard' placeholder='Tìm kiếm ...' />
              <button style={{ backgroundColor: '#64be43' }}>
                <SearchIcon style={{ height: 15 }} />
              </button>
            </div>
            <div>
              <button style={{ backgroundColor: '#64be43' }}>
                Add Voucher
              </button>
            </div>
          </div>
          <div className='borderTable-Dashboard'>
            <table>
              <thead>
                <tr>
                  {tableVoucher.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {voucherData.map(i => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.voucherCode}</td>
                    <td>{i.discountPercent}</td>
                    <td>{format(new Date(i.startDate), 'dd/MM/yyyy')}</td>
                    <td>{format(new Date(i.expirationDate), 'dd/MM/yyyy')}</td>
                    <td>Active</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={() => handleEdit(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(i.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'rgb(100, 190, 67)', height: '100vh' }}>
        <div className='ContainInfo-Dashboard'>
          <img className='avatarAdmin-Dashboard' src='https://i.pinimg.com/564x/01/c7/51/01c751482ef7c4f5e93f3539efd27f6f.jpg' />
          <p style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Admin</p>
        </div>
        <div className='lineAdmin-Dashboard'></div>
        <div>
          <div className='Option-Dashboard' onClick={toggleUserForm}>
            <img style={{ width: 40, height: 45, marginBottom: 10 }} src='https://cdn-icons-png.flaticon.com/128/921/921347.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>User</p>
          </div>
          <div className='Option-Dashboard' onClick={toggleProductForm}>
            <img style={{ width: 40, height: 50, marginBottom: 10 }} src='https://cdn-icons-png.flaticon.com/128/4129/4129528.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Product</p>
          </div>
          <div className='Option-Dashboard' onClick={toggleOrderForm}>
            <img style={{ width: 40, height: 45 }} src='https://cdn-icons-png.flaticon.com/128/11449/11449872.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Order</p>
          </div>
          <div className='Option-Dashboard' onClick={toggleVoucherForm}>
            <img style={{ width: 40, height: 45 }} src='https://cdn-icons-png.flaticon.com/128/10218/10218090.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Voucher</p>
          </div>
        </div>
      </div>
      {showUserForm && <UserForm />}
      {showProductForm && <ProductForm />}
      {showOrderForm && <OrderForm tableOrder={tableOrder} />}
      {showVoucherForm && <VoucherForm />}
    </div>
  )
}
