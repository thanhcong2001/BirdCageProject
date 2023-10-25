import React, { useState } from 'react'
import '../Dashboard/Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
export const Dashboard = () => {
  const initialUsers = [
    { id: 1, name: 'User 1', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 2, name: 'User 2', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 3, name: 'User 3', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 4, name: 'User 4', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 5, name: 'User 5', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
    { id: 6, name: 'User 6', email: 'cong@gmail.com', gender: 'male', phone: '0393103426', birth: '18/02/2001', created: '24/10/2023', status: 'Active' },
  ];
  const [users, setUsers] = useState(initialUsers);

  const handleEdit = (id) => {
    // Xử lý chức năng chỉnh sửa
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Xử lý chức năng xóa
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'rgb(100, 190, 67)', height: 763 }}>
        <div className='ContainInfo-Dashboard'>
          <img className='avatarAdmin-Dashboard' src='https://i.pinimg.com/564x/01/c7/51/01c751482ef7c4f5e93f3539efd27f6f.jpg' />
          <p style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Admin</p>
        </div>
        <div className='lineAdmin-Dashboard'></div>
        <div>
          <div className='Option-Dashboard'>
            <img style={{ width: 40, height: 40 }} src='https://o.remove.bg/downloads/12c6833d-40df-4900-9a90-bd28c2ee8e4d/5a54cfdb6320b05029b8fafb6fdb5f4e-removebg-preview.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>User</p>
          </div>
          <div className='Option-Dashboard'>
            <img style={{ width: 40, height: 30 }} src='https://o.remove.bg/downloads/db0bc914-aeaa-4a46-9f77-d3bc175aff94/28f21935eb6463f2b32c1e689932a68a-removebg-preview.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Product</p>
          </div>
          <div className='Option-Dashboard'>
            <img style={{ width: 40, height: 35 }} src='https://o.remove.bg/downloads/745fc425-b03f-45d5-871d-7c7de8f48f39/8aefc13be28515f1342a4a1e90feb37b-removebg-preview.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Order</p>
          </div>
          <div className='Option-Dashboard'>
            <img style={{ width: 40, height: 40 }} src='https://o.remove.bg/downloads/9b7add3d-b90f-42db-94f0-4b929e775444/52b565f74a8107bb18b5bc7f0bceab88-removebg-preview.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Dashboard</p>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 100}}>
        <div>
          <p style={{ fontSize: 23, letterSpacing: 2, marginBottom:10}}>User Management</p>
          <div style={{display:'flex'}}>
            <input className='inputSearch-Dashboard' placeholder='Tìm kiếm ...' />
            <button style={{ backgroundColor: '#64be43' }}>
              <SearchIcon style={{height:15}} />
            </button>
          </div>
          <div className='borderTable-Dashboard'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Birth Date</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.phone}</td>
                    <td>{user.birth}</td>
                    <td>{user.created}</td>
                    <td>{user.status}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={() => handleEdit(user.id)}>Edit</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
