import React, { useEffect } from 'react'
import '../Setting/style.css'
import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import axiosClient from "../../api/axiosClient"
import apiClient from 'api/apiClient';
const { jwtDecode } = require('jwt-decode');
function Setting() {
  const [showAccountForm, setShowAccountForm] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [data, setData] = useState([])
  const toggleAccountForm = () => {
    setShowAccountForm(true);
    setShowPasswordForm(false);
  };

  const togglePasswordForm = () => {
    setShowAccountForm(false);
    setShowPasswordForm(true);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          setData(response.data);
          console.log('Thang: ',response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  }, [])

  function AccountForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    return (
      <div style={{ marginLeft: 100 }}>
        <h2>Account Setting</h2>
        <div className='inputInfo-setting'>
          <div style={{ marginRight: 50 }}>
            <p>User Name</p>
            <input className='formTextInfo'
              placeholder={data.userName} />
          </div>
          <div>
            <p>User Email</p>
            <input className='formTextInfo'
              placeholder={data.email} />
          </div> 
        </div>
        <div className='inputInfo-setting'>
          <div style={{ marginRight: 50 }}>
            <p>Phone Number</p>
            <input className='formTextInfo'
              placeholder={data.phoneNumber} />
          </div>
          <div>
            <p>Gender</p>
            <input className='formTextInfo'
              placeholder={data.gender} />
          </div>
        </div>
        <div>
        <p>Date of birth</p>
          <DatePicker className='formTextInfo'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText={data.doB}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <button>Update</button>
          <button style={{ backgroundColor: '#D3D3D3', color: 'black', marginLeft: 10 }}>Cancel</button>
        </div>
      </div>
    );
  }
  function PasswordForm() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');

    const oldPassword = (e) => {
      setOldPass(e.target.value);
    };

    const newPassword = (e) => {
      setNewPass(e.target.value);
    };

    const rePassword = (e) => {
      setRePass(e.target.value);
    };
    const CancelButton = (e) => {
      setOldPass('');
      setNewPass('');
      setRePass('');
    };

    const changPass = () => {
      const login = JSON.parse(localStorage.getItem('token'));

      // Kiểm tra xem người dùng đã đăng nhập và mã token hợp lệ
      if (login) {
        if (newPass === rePass) {
          const data = {
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: rePass
          } 
          apiClient.put('User/change-password', data, {
            headers: {
              'Authorization': 'Bearer ' + login,
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
              console.log("Status: ", response.status);
              // Xử lý thành công, có thể hiển thị thông báo cho người dùng
            })
            .catch(function (error) {
              console.log(error);
              // Xử lý lỗi, hiển thị thông báo lỗi cho người dùng hoặc kiểm tra mã lỗi cụ thể từ máy chủ.
            });
        } else {
          console.log("New Password and Confirm Password do not match.");
        }
      } else {
        console.log("User is not logged in. Please log in first.");
      }
    }
    return (
      <div>
        <div style={{ marginLeft: 100 }}>
          <h2>Password Setting</h2>
          <div className='inputInfo-setting'>
            <div style={{ marginRight: 50 }}>
              <p>Old Password</p>
              <input className='formTextInfo' type="password"
                value={oldPass}
                onChange={oldPassword} placeholder='*************' />
            </div>
          </div>
          <div className='inputInfo-setting'>
            <div style={{ marginRight: 50 }}>
              <p>New Password</p>
              <input className='formTextInfo' type="password"
                value={newPass}
                onChange={newPassword} placeholder='*************' />
            </div>
            <div>
              <p>Confirm new password</p>
              <input className='formTextInfo' type="password"
                value={rePass}
                onChange={rePassword} placeholder='*************' />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <button onClick={changPass}>Update</button>
            <button onClick={CancelButton} style={{ backgroundColor: '#D3D3D3', color: 'black', marginLeft: 10 }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginTop: 120 }}>
      <div className='Container-Setting'>
        <div className='borderInfo-Setting'>
          <div style={{ padding: 15, marginLeft: 55 }}>
            <img src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/324736014_1240215329893369_5490209580249412603_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WeT9xi_5yuYAX_VIJng&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDp4Nhh_oMUBofQckZ_lNaqYZk307GkCbjm6zRyj2dQRg&oe=653B976F' className='Setting-Image' />
            <h3 >Lương Thành {data.userName}</h3>
          </div>
          <div className='line-Setting'></div>
          <div className='OptionSetting' onClick={toggleAccountForm}>
            <div className='Option'>Account</div>
            <div className='line-Setting'></div>
          </div>
          <div className='OptionSetting' onClick={togglePasswordForm}>
            <div className='Option'>Password</div>
            <div className='line-Setting'></div>
          </div>
        </div>
        {showAccountForm && <AccountForm />}
        {showPasswordForm && <PasswordForm />}
      </div>
    </div>
  )
}

export default Setting
