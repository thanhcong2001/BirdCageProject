import React, { useState, useEffect } from 'react'
import '../Dashboard/Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
export const Dashboard = () => {
  const [data, setdata] = useState([])
  const [productData, setProductData] = useState([])
  useEffect(() => {
    axios.get('http://tainguyen58-001-site1.ftempurl.com/api/User')
      .then(response => {
        setdata(response.data)
      })
    axios.get('http://tainguyen58-001-site1.ftempurl.com/api/Product/page?pageIndex=0&pageSize=10')
      .then(response => {
        setProductData(response.data?.items)
        console.log("Data Product: ", productData);
      })
  }, [])
  const initialUsers = [
    { id: 1, name: 'User 1', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 2, name: 'User 2', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 3, name: 'User 3', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 4, name: 'User 4', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 5, name: 'User 5', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 6, name: 'User 6', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },];
  const tableHeaders = ['Name', 'Email', 'Gender', 'Phone Number', 'Birth Date', 'Status', 'Action'];
  const tableProduct = ['ID', 'Name', 'Image', 'Price', 'Price Discount', 'Discount', 'Sku', 'Status', 'Action'];
  const [users, setUsers] = useState(initialUsers);
  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };
  const handleDelete = (id) => {
    const updatedUsers = data.filter(i => i.id !== id);
    setdata(updatedUsers);
  };


  const [showUserForm, setShowUserForm] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);

  const toggleUserForm = () => {
    setShowUserForm(true);
    setShowProductForm(false);
  };

  const toggleProductForm = () => {
    setShowUserForm(false);
    setShowProductForm(true);
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
                    <td>{i.phoneNumber}</td>
                    <td>{i.doB}</td>
                    <td>{i.isDelete}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={() => handleEdit(i.id)}>Edit</button>
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
    return (
      <div style={{ marginLeft: 100 }}>
        <div>
          <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Product Management</p>
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
                  {tableProduct.map((product, index) => (
                    <th key={index}>{product}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productData.map(i => (
                  <tr key={i?.id}>
                    <td>{i?.id}</td>
                    <td>{i?.title}</td>
                    <td><img style={{width:40,height:40}} src={i?.productImages[0]?.imageUrl}/></td>
                    <td>{i?.priceAfterDiscount}</td>
                    <td>{i?.percentDiscount}</td>
                    <td>{i?.sku}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={() => handleEdit(i.items.id)}>Edit</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(i.items.id)}>Delete</button>
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
          <div className='Option-Dashboard'>
            <img style={{ width: 40, height: 45 }} src='https://cdn-icons-png.flaticon.com/128/11449/11449872.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Order</p>
          </div>
          <div className='Option-Dashboard'>
            <img style={{ width: 40, height: 45 }} src='https://cdn-icons-png.flaticon.com/128/10218/10218090.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Dashboard</p>
          </div>
        </div>
      </div>
      {showUserForm && <UserForm />}
      {showProductForm && <ProductForm />}
    </div>
  )
}
