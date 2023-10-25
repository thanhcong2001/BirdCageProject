import React from 'react'
import '../Setting/style.css'
import { useState } from 'react';

function Setting() {
  const [showAccountForm, setShowAccountForm] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  // Đặt giá trị mặc định để ẩn cả hai biểu mẫu ban đầu

  const toggleAccountForm = () => {
    setShowAccountForm(true);
    setShowPasswordForm(false);
  };

  const togglePasswordForm = () => {
    setShowAccountForm(false);
    setShowPasswordForm(true);
  };
  function AccountForm() {
    return (
      <div style={{ marginLeft: 100 }}>
        <h2>Account Setting</h2>
        <div className='inputInfo-setting'>
          <div style={{ marginRight: 50 }}>
            <p>First Name</p>
            <input className='formTextInfo' />
          </div>
          <div>
            <p>Last Name</p>
            <input className='formTextInfo' />
          </div>
        </div>
        <div className='inputInfo-setting'>
          <div style={{ marginRight: 50 }}>
            <p>Email</p>
            <input className='formTextInfo' />
          </div>
          <div>
            <p>Phone Number</p>
            <input className='formTextInfo' />
          </div>
        </div>
        <div>
          <p>Bio</p>
          <input className='BioInput' />
        </div>
        <div style={{ marginTop: 20 }}>
          <button>Update</button>
          <button style={{ backgroundColor: '#D3D3D3', color: 'black', marginLeft: 10 }}>Cancel</button>
        </div>
      </div>
    );
  }
  function PasswordForm() {
    return (
      <div>
        <div style={{ marginLeft: 100 }}>
          <h2>Password Setting</h2>
          <div className='inputInfo-setting'>
            <div style={{ marginRight: 50 }}>
              <p>Old Password</p>
              <input className='formTextInfo' />
            </div>
          </div>
          <div className='inputInfo-setting'>
            <div style={{ marginRight: 50 }}>
              <p>New Password</p>
              <input className='formTextInfo' />
            </div>
            <div>
              <p>Confirm new password</p>
              <input className='formTextInfo' />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <button>Update</button>
            <button style={{ backgroundColor: '#D3D3D3', color: 'black', marginLeft: 10 }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='Container-Setting'>
      <div className='borderInfo-Setting'>
        <div style={{ padding: 15, marginLeft: 55 }}>
          <img src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/324736014_1240215329893369_5490209580249412603_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WeT9xi_5yuYAX_VIJng&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDp4Nhh_oMUBofQckZ_lNaqYZk307GkCbjm6zRyj2dQRg&oe=653B976F' className='Setting-Image' />
          <h3>Lương Thành Công</h3>
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
  )
}

export default Setting
