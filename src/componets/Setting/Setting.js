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
import { textTransform } from '@mui/system';
import swal from 'sweetalert';
const { jwtDecode } = require('jwt-decode');
function Setting() {
  const [showAccountForm, setShowAccountForm] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [data, setData] = useState([])
  const [activeOption, setActiveOption] = useState('account');
  const toggleAccountForm = () => {
    setShowAccountForm(true);
    setShowPasswordForm(false);
    setActiveOption('account');
  };

  const togglePasswordForm = () => {
    setShowAccountForm(false);
    setShowPasswordForm(true);
    setActiveOption('password');
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);

        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  }, [])

  const convertDate = (date) => {
    let fDate = new Date(date)
    return fDate.toLocaleDateString()
  }

  function AccountForm() {

    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const [selectedName, setSelectedName] = useState(null);
    const handleNameChange = (name) => {
      setSelectedName(name);
    };
    const [selectedEmail, setSelectedEmail] = useState(null);
    const handleEmailChange = (email) => {
      setSelectedEmail(email);
    };
    const [selectedPhone, setSelectedPhone] = useState(null);
    const handlePhoneChange = (phone) => {
      setSelectedPhone(phone);
    };
    const [selectedGender, setSelectedGender] = useState(null);
    const handleGenderChange = (gender) => {
      setSelectedPhone(gender);
    };

    const updateProfile = () => {
      const login = localStorage.getItem('token');
      if (login) {
        const data = {
          userName: selectedName,
          email: selectedEmail,
          phoneNumber: selectedPhone,
          gender: selectedGender,
          doB: selectedDate
        }
        apiClient.put('User/update-profile', data, {
          headers: {
            'Authorization': 'Bearer ' + login,
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            console.log("Status: ", response.status);
            swal({
              title: "Cập nhật thành công",
              icon: "success",
            })
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    return (
      <div style={{ marginLeft: 100 }}>
        <h2>Account Setting</h2>
        <div className='inputInfo-setting'>
          <div style={{ marginRight: 50 }}>
            <p>User Name</p>
            <input className='formTextInfo' onChange={() => handleNameChange()}
              placeholder={data.userName} />
          </div>
          <div>
            <p>User Email</p>
            <input className='formTextInfo'
              onChange={handleEmailChange}
              placeholder={data.email} />
          </div>
        </div>
        <div className='inputInfo-setting'>
          <div style={{ marginRight: 50 }}>
            <p>Phone Number</p>
            <input className='formTextInfo'
              onChange={handlePhoneChange}
              placeholder={data.phoneNumber} />
          </div>
          <div>
            <form>
              <p>Gender</p>
              <select className='select-optionGender' onChange={setSelectedGender}>
                <option disabled selected defaultValue={data?.gender}>{data?.gender}</option >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </form>
          </div>
        </div>
        <div>
          <p>Date of birth</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <button onClick={updateProfile}>Update</button>
          <button style={{ backgroundColor: '#D3D3D3', color: 'black', marginLeft: 10 }}>Cancel</button>
        </div>
      </div>
    );
  }
  function PasswordForm() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePassError, setRePassError] = useState('');
    const oldPassword = (e) => {
      setOldPass(e.target.value);
    };

    const newPassword = (e) => {
      setNewPass(e.target.value);
    };

    const rePassword = (e) => {
      setRePass(e.target.value);
    };

    const checkRePassword = () => {
      if (rePass.length < 6 || rePass.length > 20) {
        setRePassError('New password must be between 6 and 20 characters.');
      } else {
        setRePassError('');
        // Kiểm tra các yêu cầu khác ở đây
        checkFormatRePassword();
      }
    };
    const checkFormatRePassword = () => {
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const digitRegex = /\d/;
      const nonAlphaNumericRegex = /[^A-Za-z0-9]/;
      if (
        lowerCaseRegex.test(rePass) &&
        upperCaseRegex.test(rePass) &&
        digitRegex.test(rePass) &&
        nonAlphaNumericRegex.test(rePass)
      ) {
        setRePassError('');
      } else {
        setRePassError(
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one non-alphanumeric character.'
        );
      }
    };

    const hidePasswordError = () => {
      setPasswordError();
    };
    const hideRePassError = () => {
      setRePassError();
    };

    const checkNewPassword = () => {
      if (newPass.length < 6 || newPass.length > 20) {
        setPasswordError('New password must be between 6 and 20 characters.');
      } else {
        setPasswordError('');
        // Kiểm tra các yêu cầu khác ở đây
        checkFormatPassword();
      }
    };
    const checkFormatPassword = () => {
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const digitRegex = /\d/;
      const nonAlphaNumericRegex = /[^A-Za-z0-9]/;
      if (
        lowerCaseRegex.test(newPass) &&
        upperCaseRegex.test(newPass) &&
        digitRegex.test(newPass) &&
        nonAlphaNumericRegex.test(newPass)
      ) {
        setPasswordError('');
      } else {
        setPasswordError(
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one non-alphanumeric character.'
        );
      }
    };

    const CancelButton = (e) => {
      setOldPass('');
      setNewPass('');
      setRePass('');
    };
    const changPass = () => {
      const login = JSON.parse(localStorage.getItem('token'));
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
              swal({
                title: "Cập nhật thành công",
                icon: "success",
              })
            })
            .catch(function (error) {
              console.log(error);

            });
        } else {
          swal({
            title: "New Password and Confirm Password do not match.",
            icon: "warning",
            dangerMode: true,
          })
        }
      } else {
        console.log("User is not logged in. Please log in first.");
      }
    }
    return (
      <div>
        <div style={{ marginLeft: 100 }}>
          <h2>Change Password</h2>
          <div className="inputInfo-setting">
            <div style={{ marginRight: 50 }}>
              <p>Old Password</p>
              <input
                className="formTextInfo"
                type="password"
                value={oldPass}
                onChange={oldPassword}
                placeholder="*************"
              />
            </div>
          </div>
          <div className="inputInfo-setting">
            <div style={{ marginRight: 50 }}>
              <p>New Password</p>
              <input
                className="formTextInfo"
                type="password"
                value={newPass}
                onChange={newPassword}
                onBlur={checkNewPassword}
                onFocus={hidePasswordError}
                placeholder="*************"
              />
              <div style={{ width: 300, fontSize: 13, color: 'red' }}>{passwordError}</div>

            </div>
            <div>
              <p>Confirm new password</p>
              <input
                className="formTextInfo"
                type="password"
                value={rePass}
                onChange={rePassword}
                onBlur={checkRePassword}
                onFocus={hideRePassError}
                placeholder="*************"
              />
              <div style={{ width: 300, fontSize: 13, color: 'red' }}>{rePassError}</div>
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
          <div style={{ padding: 15, textAlign: 'center' }}>
            <img src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/324736014_1240215329893369_5490209580249412603_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WeT9xi_5yuYAX_VIJng&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfDp4Nhh_oMUBofQckZ_lNaqYZk307GkCbjm6zRyj2dQRg&oe=653B976F' className='Setting-Image' />
            <p style={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold' }}>{data.userName}</p>
          </div>
          <div className='line-Setting'></div>
          <div className='OptionSetting' onClick={toggleAccountForm} style={{
            backgroundColor: activeOption === 'account' ? 'rgb(100, 190, 67)' : 'initial',
            color: activeOption === 'account' ? '#fff' : 'initial',
          }}>
            <div className='Option'>Account</div>
            <div className='line-Setting'></div>
          </div>
          <div className='OptionSetting' onClick={togglePasswordForm} style={{
            backgroundColor: activeOption === 'password' ? 'rgb(100, 190, 67)' : 'initial',
            color: activeOption === 'password' ? '#fff' : 'initial',
          }}>
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
