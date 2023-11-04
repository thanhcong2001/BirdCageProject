import React, { useState, useEffect } from 'react'
import '../Dashboard/Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { format } from 'date-fns';
import OrderForm from './OrderForm/OrderForm';
import axiosClient from 'api/axiosClient';
import apiClient from 'api/apiClient';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import useAddVoucher from './Voucher/useAddVoucher';
const { RangePicker } = DatePicker;
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
  const handleEditUser = (id) => {
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

  const handleCopyUserId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  const handleDeleteUser = (id) => {
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
  const handleEditProduct = (id) => {
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

  const handleDeleteProduct = (id) => {
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
  const handleEditVoucher = (id) => {
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
  const handleDeleteVoucher = (id) => {
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
  const [showAddVoucherForm, setShowAddVoucherForm] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const toggleUserForm = () => {
    setShowUserForm(true);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(false)
    setShowAddVoucherForm(false)
    setActiveOption('user');
  };
  const toggleProductForm = () => {
    setShowOrderForm(false)
    setShowUserForm(false);
    setShowProductForm(true);
    setShowVoucherForm(false)
    setShowAddVoucherForm(false)
    setActiveOption('product');
  };
  const toggleOrderForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(true);
    setShowVoucherForm(false)
    setShowAddVoucherForm(false)
    setActiveOption('order');
  };
  const toggleVoucherForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(true);
    setShowAddVoucherForm(false)
    setActiveOption('voucher');
  };

  const toggleAddVoucherForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(false);
    setShowAddVoucherForm(true)
    setActiveOption('addVoucher');
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
                      <button style={{ marginRight: 20 }} onClick={() => handleEditUser(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red', marginRight: 20 }} onClick={() => handleDeleteUser(i.id)}>Delete</button>
                      <button style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => handleCopyUserId(i.id)}>Copy user id</button>
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
                    <td><img style={{ width: 40, height: 40 }} src={i?.productImages[0]?.imageUrl} alt='hinh anh'/></td>
                    <td>{i?.price}</td>
                    <td>{i?.priceAfterDiscount}</td>
                    <td>{i?.sku}</td>
                    <td>Iron Cage</td>
                    <td>{i.isDelete ? "Deactive" : "Active"}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={openPopup}>Edit</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteProduct(i.items.id)}>Delete</button>
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <input className='inputSearch-Dashboard' placeholder='Tìm kiếm ...' />
              <button style={{ backgroundColor: '#64be43' }}>
                <SearchIcon style={{ height: 15 }} />
              </button>
            </div>
            <div>
              <button style={{ backgroundColor: '#64be43' }} onClick={toggleAddVoucherForm}>
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
                      <button style={{ marginRight: 20 }} onClick={() => handleEditVoucher(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteVoucher(i.id)}>Delete</button>
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

  function AddVoucherForm() {
    const [formData, setFormData] = useState({
      discountPercent: '',
      applicationUserId: '',
    });

    const [info, setInfo] = useState(null)

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const {addVoucher, addVoucherPending} = useAddVoucher()

    const handleChangeDate = (e) => {
      const date = e.map(d => d.$d)
      const startDate = date[0];
      const endDate = date[1];
      const info = {
        startDate: startDate.toISOString(),
        expirationDate: endDate.toISOString(),
        ...formData,
      }
      setInfo(()=> info)
    }
    const handleSubmit = async () => {
      await addVoucher(info)
    }
    return (
      <div style={{
        width: '100%'
      }}>
        <h2 style={{ marginBottom: 30 }}>Add voucher</h2>
                <form style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  margin: '0 auto',
                  gap: '20px'
                }} >
                  <input style={{
                    width: '80%',
                    margin: '0 auto',
                  }} className='inputEdit-Product' 
                  name='discountPercent'
                  placeholder="Discount percent"
                  value={formData.discountPercent}
                  onChange={handleInputChange}/>
                  <input style={{
                    width: '80%',
                    margin: '0 auto',
                  }} className='inputEdit-Product' name='applicationUserId'
                  placeholder="User"
                  value={formData.applicationUserId}
                  onChange={handleInputChange} />
                  <div style={{
                    width: '80%',
                    margin: '0 auto',
                  }}>
                    <RangePicker onChange={handleChangeDate} />
                  </div>
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' , width: '50%',
                  margin: '0 auto',}}>
                  <button style={{ marginRight: 30 }} onClick={handleSubmit}>
                    {addVoucherPending ? 'Submitting' : 'Submit'}
                    </button>
                  <button style={{ backgroundColor: 'red' }} onClick={toggleVoucherForm}>Cancel</button>
                </div>
      </div>
    )
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
          <div className='Option-Dashboard' onClick={toggleUserForm} style={{
            backgroundColor: activeOption === 'user' ? 'lightBlue' : 'initial',
            color: activeOption === 'user' ? '#fff' : 'initial',
          }}>
            <img style={{ width: 40, height: 45, marginBottom: 10 }} src='https://cdn-icons-png.flaticon.com/128/921/921347.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>User</p>
          </div>
          <div className='Option-Dashboard' onClick={toggleProductForm} style={{
            backgroundColor: activeOption === 'product' ? 'lightBlue' : 'initial',
            color: activeOption === 'product' ? '#fff' : 'initial',
          }}>
            <img style={{ width: 40, height: 50, marginBottom: 10 }} src='https://cdn-icons-png.flaticon.com/128/4129/4129528.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Product</p>
          </div>
          <div className='Option-Dashboard' onClick={toggleOrderForm} style={{
            backgroundColor: activeOption === 'order' ? 'lightBlue' : 'initial',
            color: activeOption === 'order' ? '#fff' : 'initial',
          }}>
            <img style={{ width: 40, height: 45 }} src='https://cdn-icons-png.flaticon.com/128/11449/11449872.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Order</p>
          </div>
          <div className='Option-Dashboard' onClick={toggleVoucherForm} style={{
            backgroundColor: activeOption === 'voucher' ? 'lightBlue' : 'initial',
            color: activeOption === 'voucher' ? '#fff' : 'initial',
          }}>
            <img style={{ width: 40, height: 45 }} src='https://cdn-icons-png.flaticon.com/128/10218/10218090.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Voucher</p>
          </div>
        </div>
      </div>
      {showUserForm && <UserForm />}
      {showProductForm && <ProductForm />}
      {showOrderForm && <OrderForm tableOrder={tableOrder} />}
      {showVoucherForm && <VoucherForm />}
      {showAddVoucherForm && <AddVoucherForm />}
    </div>
  )
}
