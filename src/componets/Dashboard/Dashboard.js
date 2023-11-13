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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import deleteClient from 'api/deleteApi';
import swal from 'sweetalert';
const { jwtDecode } = require('jwt-decode');
const { RangePicker } = DatePicker;
export const Dashboard = () => {
  const [data, setdata] = useState([])
  const [productData, setProductData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [voucherData, setVoucherData] = useState([])
  const [role, setRole] = useState()
  const [author, setAuthor] = useState([])
  const [formula, setFormula] = useState([])
  const [name, setName] = useState([])
  useEffect(() => {
    fetchUsers()
    fetchProduct()
    apiClient.get('Order/page?pageIndex=1&pageSize=10')
      .then(response => {
        setOrderData(response.data?.items)
      })
    apiClient.get('Voucher')
      .then(response => {
        setVoucherData(response.data)
      })
    apiClient.get('Formula/page?pageIndex=0&pageSize=10')
      .then(response => {
        setFormula(response.data?.items.reverse())
      })
  }, [])


  useEffect(() => {
    const token = localStorage.getItem('token') || null
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          setAuthor(response.data?.role);
          setName(response.data)
          console.log("Role: ", response.data?.role);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  }, [])
  const tableHeaders = ['Name', 'Email', 'Role', 'Gender', 'Phone Number', 'Birth Date', 'Status', 'Action'];
  const tableProduct = ['ID', 'Name', 'Image', 'Price', 'Price Discount', 'Sku', 'Quantity', 'Status', 'Action'];
  const tableOrder = ['ID', , 'Name Recieved', 'Price', 'Phone', 'Payment Status', 'Order Status', 'Action'];
  const tableVoucher = ['ID', 'Voucher Code', 'Discount Percent', 'start Date', 'Expiration Date', 'Status', 'Action'];
  const tableFormula = ['ID', 'Type', 'Price', 'Construction', 'Width', 'Height', 'Spoke', 'Material', 'Status', 'Action'];
  function convertVND(price) {
    if (price != null && price !== undefined && price !== '') return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    else return 0
  }
  const fetchUsers = () => {
    apiClient.get('User?pageIndex=0&pageSize=10')
      .then(response => {
        setdata(response.data?.items)
      })
  }
  const fetchProduct = () => {
    apiClient.get('Product/get-all-product/page?pageIndex=0&pageSize=10')
      .then(response => {
        setProductData(response.data?.items)
        console.log("Cong Dev: ", response.data?.items.reverse());
      })
  }
  const fetchFormula = () => {
    apiClient.get('Formula/page?pageIndex=0&pageSize=10')
      .then(response => {
        setFormula(response.data?.items.reverse())
      })
  }
  const handleEditUser = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          const role = response.data?.role;
          if (role === "Manager") {
            apiClient.put(`User/recover/${id}`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  fetchUsers();
                  swal({
                    title: "Active Thành Công",
                    icon: "success",
                  });
                } else {
                  swal({
                    title: "Active Thất Bại",
                    icon: "warning",
                  });
                }
              })
              .catch((error) => {
                console.error('Lỗi kết nối', error);
              });
          } else {
            swal({
              title: "Không có quyền cập nhật !",
              icon: "warning",
            })
          }
        })
        .catch((error) => {
          console.error('Lỗi trong quá trình kiểm tra vai trò', error);
        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  };
  const handleDeleteUser = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          setRole(response.data?.role);
          if (response.data?.role === 'Manager') {
            deleteClient.delete(`${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  fetchUsers()
                  swal({
                    title: "Xóa Thành Công",
                    icon: "success",
                  })
                } else {
                  swal({
                    title: "Xóa Thất Bại",
                    icon: "warning",
                  })
                }
              })
              .catch((error) => {
                swal({
                  title: "Không có quyền xóa !",
                  icon: "warning",
                })
              });
          } else {
            swal({
              title: "Không có quyền xóa !",
              icon: "warning",
            })
          }
        })
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  };
  const handleEditProduct = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;

      apiClient.get(`User/${userId}`)
        .then(response => {
          const role = response.data?.role;
          if (role === "Manager" || role === "Staff") {
            apiClient.put(`Product/recover/${id}`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  fetchProduct();
                  swal({
                    title: "Active Thành Công",
                    icon: "success",
                  });
                } else {
                  swal({
                    title: "Active Thất Bại",
                    icon: "warning",
                  });
                }
              })
              .catch((error) => {
                swal({
                  title: "Không có quyền cập nhật !",
                  icon: "warning",
                })
              });
          } else {
            swal({
              title: "Không có quyền cập nhật !",
              icon: "warning",
            })
          }
        })
        .catch((error) => {
          console.error('Lỗi trong quá trình kiểm tra vai trò', error);
        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  };

  const handleDeleteProduct = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          setRole(response.data?.role);
          if (response.data?.role === 'Manager') {
            apiClient.delete(`Product/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  fetchProduct()
                  swal({
                    title: "Xóa Thành Công",
                    icon: "success",
                  })
                } else {
                  swal({
                    title: "Xóa Thất Bại",
                    icon: "warning",
                  })
                }
              })
              .catch((error) => {
                swal({
                  title: "Không có quyền xóa !",
                  icon: "warning",
                })
              });
          } else {
            swal({
              title: "Không có quyền xóa !",
              icon: "warning",
            })
          }
        })
    }
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
    apiClient.delete(`${id}`)
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

  const handleDeleteFormula = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;
      apiClient.get(`User/${userId}`)
        .then(response => {
          setRole(response.data?.role);
        })
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
    if (role === 'Manager') {
      apiClient.delete(`Formula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            fetchFormula()
            swal({
              title: "Xóa Thành Công",
              icon: "success",
            })
          } else {
            swal({
              title: "Xóa Thất Bại",
              icon: "warning",
            })
          }
        })
        .catch((error) => {
          console.error('Lỗi kết nối', error);
        });
    } else {
      swal({
        title: "Không có quyền xóa !",
        icon: "warning",
      })
    }
  };

  const handleEditFormula = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Id;

      apiClient.get(`User/${userId}`)
        .then(response => {
          const role = response.data?.role;
          if (role === "Manager" || role === "Staff") {
            apiClient.put(`Formula/recover-formula/${id}`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  fetchFormula();
                  swal({
                    title: "Active Thành Công",
                    icon: "success",
                  });
                } else {
                  swal({
                    title: "Active Thất Bại",
                    icon: "warning",
                  });
                }
              })
              .catch((error) => {
                swal({
                  title: "Không có quyền cập nhật !",
                  icon: "warning",
                })
              });
          } else {
            swal({
              title: "Không có quyền cập nhật !",
              icon: "warning",
            })
          }
        })
        .catch((error) => {
          console.error('Lỗi trong quá trình kiểm tra vai trò', error);
        });
    } else {
      console.log('Token không tồn tại trong localStorage.');
    }
  };
  const [showUserForm, setShowUserForm] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showVoucherForm, setShowVoucherForm] = useState(false);
  const [showAddVoucherForm, setShowAddVoucherForm] = useState(false);
  const [activeOption, setActiveOption] = useState('user');
  const [showFormulaForm, setShowFormulaForm] = useState(false);

  const toggleUserForm = () => {
    setShowUserForm(true);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(false)
    setShowAddVoucherForm(false)
    setActiveOption('user');
    setShowFormulaForm(false)
  };
  const toggleProductForm = () => {
    setShowOrderForm(false)
    setShowUserForm(false);
    setShowProductForm(true);
    setShowVoucherForm(false)
    setShowAddVoucherForm(false)
    setActiveOption('product');
    setShowFormulaForm(false)
  };
  const toggleOrderForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(true);
    setShowVoucherForm(false)
    setShowAddVoucherForm(false)
    setActiveOption('order');
    setShowFormulaForm(false)
  };
  const toggleVoucherForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(true);
    setShowAddVoucherForm(false)
    setActiveOption('voucher');
    setShowFormulaForm(false)
  };

  const toggleAddVoucherForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(false);
    setShowAddVoucherForm(true)
    setActiveOption('addVoucher');
    setShowFormulaForm(false)
  };
  const toggleFormulaForm = () => {
    setShowUserForm(false);
    setShowProductForm(false);
    setShowOrderForm(false);
    setShowVoucherForm(false);
    setShowAddVoucherForm(false)
    setActiveOption('formula');
    setShowFormulaForm(true)
  };
  function UserForm() {
    return (
      <div style={{ marginLeft: 100, marginTop: 30 }}>
        <div>
          <div style={{ display: 'flex' }}>
            <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>User Management</p>
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
                    <td>{i.role}</td>
                    <td>{i.gender}</td>
                    <td>{i.phoneNumber ? i.phoneNumber.replace(/'/g, '') : ''}</td>
                    <td>{format(new Date(i.doB), 'dd/MM/yyyy')}</td>
                    <td>{i.isDelete ? "Deactive" : "Active"}</td>
                    <td>
                      <button style={{ marginRight: 20 }} onClick={() => handleEditUser(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red', marginRight: 20 }} onClick={() => handleDeleteUser(i.id)}>Delete</button>
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
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [showPopup, setShowPopup] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [idEdit, setIdEdit] = useState([])
    const [title, setTitle] = useState(''); // Sử dụng giá trị mặc định nếu có
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [birdCageTypeId, setBirdCageTypeId] = useState('');
    const [price, setPrice] = useState(''); // Sử dụng giá trị mặc định nếu có
    const [sku, setSku] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [percentDiscount, setPercentDiscount] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [Empty, setIsEmpty] = useState(false);
    const [file, setFile] = useState();
    function handleChange(e) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const formattedFile = new File([selectedFile], selectedFile.name, { type: selectedFile.type });
        setFile(formattedFile);
      }
    }
    const openPopup = (id) => {
      apiClient.get(`Product/${id}`)
        .then(response => {
          setIdEdit(response.data)
        })
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
    const handleInputChange = (e, setStateFunction) => {
      setStateFunction(e.target.value);
    };
    const createProduct = () => {
      const formData = new FormData();
      formData.append('isEmpty', Empty);
      formData.append('PercentDiscount', percentDiscount);
      formData.append('QuantityInStock', quantityInStock);
      formData.append('ProductFeature', feature);
      formData.append('Price', price);
      formData.append('BirdCageTypeId', birdCageTypeId);
      formData.append('files', file);
      formData.append('Title', title);
      formData.append('CategoryId', categoryId);
      formData.append('Description', description);
      formData.append('SKU', sku);
      formData.append('ProductSpecifications', specifications);
      apiClient.post('Product/create', formData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          swal({
            title: "Tạo Thành Công",
            icon: "success",
          });
        })
        .catch(error => {
          console.error('Error creating product:', error);
        });
    };

    return (
      <div style={{ marginLeft: 100, marginTop: 30 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Product Management</p>
            <div>
              <button onClick={openAddNew} style={{ backgroundColor: '#64be43', marginTop: 25 }}>
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
                {productData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map(i => (
                  <tr key={i?.id}>
                    <td>{i?.id}</td>
                    <td style={{ width: 150 }}>{i?.title}</td>
                    <td><img style={{ width: 40, height: 40 }} src={i?.productImages[0]?.imageUrl} /></td>
                    <td>{convertVND(i?.price)}</td>
                    <td>{convertVND(i?.priceAfterDiscount)}</td>
                    <td>{i?.sku}</td>
                    <td>{i?.quantityInStock}</td>
                    <td>{i.isDelete ? "Deactive" : "Active"}</td>
                    <td>
                      {/* <button style={{ marginRight: 10, backgroundColor: 'rgb(100, 190, 67)' }} onClick={() => openPopup(i?.id)}>Edit</button> */}
                      <button style={{ marginRight: 10 }} onClick={() => handleEditProduct(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteProduct(i.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button style={{ marginRight: 30 }} onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
              Previous
            </button>
            <button style={{ paddingRight: 25, paddingLeft: 25 }} onClick={() => setPageIndex(pageIndex + 1)}>
              Next
            </button>
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
                  <input
                    className='inputEdit-Product'
                    type="text"
                    value={idEdit.title}
                    onChange={(e) => handleInputChange(e, setTitle)}
                  />
                  <input type="file" onChange={handleChange}
                    style={{ borderWidth: 1, borderStyle: 'solid', height: 20, width: 188, marginRight: 30, borderRadius: 5, padding: 7 }}
                    placeholder="Image" />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    value={idEdit.categoryId}
                    onChange={(e) => handleInputChange(e, setCategoryId)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    value={idEdit.birdCageTypeId}
                    onChange={(e) => handleInputChange(e, setBirdCageTypeId)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    value={idEdit.price}
                    onChange={(e) => handleInputChange(e, setPrice)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="text"
                    value={idEdit.sku}
                    onChange={(e) => handleInputChange(e, setSku)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    value={idEdit.quantityInStock}
                    onChange={(e) => handleInputChange(e, setQuantityInStock)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    value={idEdit.percentDiscount}
                    onChange={(e) => handleInputChange(e, setPercentDiscount)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="text"
                    value={idEdit.specifications && idEdit.specifications.length > 0 ? idEdit.specifications[0].specificationValue : "Select Specification"}
                    onChange={(e) => handleInputChange(e, setSpecifications)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="text"
                    value={idEdit.features && idEdit.features.length > 0 ? idEdit.features[0].featureName : "Select Specification"}
                    onChange={(e) => handleInputChange(e, setFeature)}
                  />
                  <textarea
                    style={{ width: 659, paddingBottom: 200 }}
                    className='inputEdit-Product'
                    value={idEdit.description}
                    onChange={(e) => handleInputChange(e, setDescription)}
                  ></textarea>
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
                  <input
                    className='inputEdit-Product'
                    type="text"
                    placeholder="Name"
                    value={title}
                    onChange={(e) => handleInputChange(e, setTitle)}
                  />
                  <input type="file" onChange={handleChange}
                    style={{ borderWidth: 1, borderStyle: 'solid', height: 20, width: 188, marginRight: 30, borderRadius: 5, padding: 7 }}
                    placeholder="Image" />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="CategoryId"
                    value={categoryId}
                    onChange={(e) => handleInputChange(e, setCategoryId)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="BirdCageTypeId"
                    value={birdCageTypeId}
                    onChange={(e) => handleInputChange(e, setBirdCageTypeId)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => handleInputChange(e, setPrice)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="text"
                    placeholder="Sku"
                    value={sku}
                    onChange={(e) => handleInputChange(e, setSku)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="Quantity"
                    value={quantityInStock}
                    onChange={(e) => handleInputChange(e, setQuantityInStock)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="Discount"
                    value={percentDiscount}
                    onChange={(e) => handleInputChange(e, setPercentDiscount)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="Specifications"
                    value={specifications}
                    onChange={(e) => handleInputChange(e, setSpecifications)}
                  />
                  <input
                    className='inputEdit-Product'
                    type="number"
                    placeholder="Feature"
                    value={feature}
                    onChange={(e) => handleInputChange(e, setFeature)}
                  />
                  <textarea
                    style={{ width: 659, paddingBottom: 200 }}
                    className='inputEdit-Product'
                    value={description}
                    onChange={(e) => handleInputChange(e, setDescription)}
                  ></textarea>
                </form>
                <div style={{ display: 'flex', marginBottom: 20, justifyContent: 'center' }}>
                  <button style={{ marginRight: 30 }} onClick={createProduct} type="submit">Submit</button>
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
      <div style={{ marginLeft: 100, marginTop: 30 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Voucher Management</p>
            <div>
              <button style={{ backgroundColor: '#64be43', marginTop: 25 }} onClick={toggleAddVoucherForm}>
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
    });

    const [info, setInfo] = useState(null)

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const { addVoucher, addVoucherPending } = useAddVoucher()

    const handleChangeDate = (e) => {
      const date = e.map(d => d.$d)
      const startDate = date[0];
      const endDate = date[1];
      const info = {
        startDate: startDate.toISOString(),
        expirationDate: endDate.toISOString(),
        applicationUserId: userId,
        ...formData,
      }
      setInfo(() => info)
    }
    const handleSubmit = async () => {
      await addVoucher(info)
    }
    const [userId, setUserId] = useState('');

    const handleChange = (event) => {
      setUserId(event.target.value);
    };
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
            onChange={handleInputChange} />
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder='User ID'
              value={userId}
              onChange={handleChange}
              sx={{
                width: '80%',
                margin: '0 auto',
              }}
            >
              {data?.map((i) => (
                <MenuItem key={i.id} value={i.id}>{i.userName}</MenuItem>
              ))}

            </Select>
          </FormControl>
          <div style={{
            width: '80%',
            margin: '0 auto',
          }}>
            <RangePicker onChange={handleChangeDate} />
          </div>
        </form>
        <div style={{
          display: 'flex', justifyContent: 'center', paddingTop: '20px', width: '50%',
          margin: '0 auto',
        }}>
          <button style={{ marginRight: 30 }} onClick={handleSubmit}>
            {addVoucherPending ? 'Submitting' : 'Submit'}
          </button>
          <button style={{ backgroundColor: 'red' }} onClick={toggleVoucherForm}>Cancel</button>
        </div>
      </div>
    )
  }


  function FormulaForm() {
    const [showPopup, setShowPopup] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [idFormula, setIdFormula] = useState([])
    const [formulaInput, setFormulaInput] = useState('');
    const [error, setError] = useState('');
    const [birdCageType, setBirdCageType] = useState([]);
    const [code, setCode] = useState('');
    const [minWidth, setMinWidth] = useState('');
    const [maxWidth, setMaxWidth] = useState('');
    const [minHeight, setMinHeight] = useState('');
    const [maxHeight, setMaxHeight] = useState('');
    const [price, setPrice] = useState('');
    const [minBars, setMinBars] = useState('');
    const [maxBars, setMaxBars] = useState('');
    const [birdCageTypeId, setBirdCageTypeId] = useState('');
    const [constructionTime, setConstructionTime] = useState('');
    const [specifications, setSpecifications] = useState('');
    const validateInput = () => {
      const formulaInputNumber = parseFloat(formulaInput);
      if (formulaInputNumber > 0 && formulaInputNumber < 100) {
        setError('');
      } else {
        setError('Số không hợp lệ');
      }
    };
    const handleInputChange = (e, setStateFunction) => {
      setStateFunction(e.target.value);
    };

    // useEffect(() => {
    //   apiClient.get('Specification/get-all')
    //     .then(response => {
    //       setSpecifications(response.data?.data)
    //     })
    //   apiClient.get('BirdCageType/get-all')
    //     .then(response => {
    //       setBirdCageType(response.data?.data)
    //       console.log("Bird: ", response.data?.data);
    //     })
    // }, []);

    const createFormula = () => {
      const formData = new FormData();
      formData.append('Code', code);
      formData.append('MinWidth', minWidth);
      formData.append('MaxWidth', maxWidth);
      formData.append('MinHeight', minHeight);
      formData.append('MaxHeight', maxHeight);
      formData.append('MinBars', minBars);
      formData.append('MaxBars', maxBars);
      formData.append('Price', price);
      formData.append('BirdCageTypeId', birdCageTypeId);
      formData.append('ConstructionTime', constructionTime);
      formData.append('Specifications', specifications);
      apiClient.post('Formula/create', formData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          swal({
            title: "Tạo Thành Công",
            icon: "success",
          });
        })
        .catch(error => {
          console.error('Error creating product:', error);
        });
    };


    const openPopup = (id) => {
      apiClient.get(`Formula/get-by-formulaId/${id}`)
        .then(response => {
          setIdFormula(response.data?.data)
        })
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

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    return (
      <div style={{ marginLeft: 69, marginTop: 30 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 23, letterSpacing: 2, marginBottom: 10 }}>Formula Management</p>
            </div>
            <div>
              <button onClick={openAddNew} style={{ backgroundColor: '#64be43', marginTop: 25 }}>
                Add Formula
              </button>
            </div>
          </div>
          <div className='borderTable-Dashboard'>
            <table>
              <thead>
                <tr>
                  {tableFormula.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formula.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map(i => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.code}</td>
                    <td>{convertVND(i.price)}</td>
                    <td>{i.constructionTime} days</td>
                    <td>{i.minWidth} - {i.maxWidth} cm</td>
                    <td>{i.minHeight} - {i.maxHeight} cm</td>
                    <td>{i.minBars} - {i.maxBars}</td>
                    <td>{i.specifications[0]?.specificationValue}</td>
                    <td>{i.isDelete ? "Deactive" : "Active"}</td>
                    <td>
                      {/* <button style={{ marginRight: 5, backgroundColor: 'rgb(100, 190, 67)' }} onClick={() => openPopup(i.id)}>Edit</button> */}
                      <button style={{ marginRight: 5 }} onClick={() => handleEditFormula(i.id)}>Active</button>
                      <button style={{ backgroundColor: 'red', marginRight: 5 }} onClick={() => handleDeleteFormula(i.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button style={{ marginRight: 20 }} onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
              Previous
            </button>
            <button style={{ paddingRight: 25, paddingLeft: 25 }} onClick={() => setPageIndex(pageIndex + 1)}>
              Next
            </button>
          </div>
          <div className="App-dash">
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <span className="close" onClick={closePopup}>
                    &times;
                  </span>
                  <h2 style={{ marginBottom: 30 }}>Edit Formula</h2>
                  <form className='formEdit-Product'>
                    <input className='inputEdit-Formula' type="text" placeholder={idFormula?.code} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.minWidth} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.maxWidth} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.minHeight} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.maxHeight} />
                    <input className='inputEdit-Formula' type="number" placeholder={convertVND(idFormula?.price)} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.minBars} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.maxBars} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula.birdCageTypeId} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula.constructionTime} />
                    <input className='inputEdit-Formula' type="number" placeholder={idFormula?.specifications?.id} />
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
                  <h2 style={{ marginBottom: 30 }}>Create Formura</h2>
                  <form className='formEdit-Product'>
                    <input className='inputEdit-Formula' type="text" placeholder="Code" value={code} onChange={(e) => handleInputChange(e, setCode)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Min-Width" value={minWidth} onChange={(e) => handleInputChange(e, setMinWidth)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Max-Width" value={maxWidth} onChange={(e) => handleInputChange(e, setMaxWidth)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Min-Height" value={minHeight} onChange={(e) => handleInputChange(e, setMinHeight)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Max-Height" value={maxHeight} onChange={(e) => handleInputChange(e, setMaxHeight)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Price" value={price} onChange={(e) => handleInputChange(e, setPrice)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Min-Bars" value={minBars} onChange={(e) => handleInputChange(e, setMinBars)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Max-Bars" value={maxBars} onChange={(e) => handleInputChange(e, setMaxBars)} />
                    <input className='inputEdit-Formula' type="number" placeholder="BirdCageTypeId" value={birdCageTypeId} onChange={(e) => handleInputChange(e, setBirdCageTypeId)} />
                    <input className='inputEdit-Formula' type="number" placeholder="ConstructionTime" value={constructionTime} onChange={(e) => handleInputChange(e, setConstructionTime)} />
                    <input className='inputEdit-Formula' type="number" placeholder="Specifications" value={specifications} onChange={(e) => handleInputChange(e, setSpecifications)} />
                  </form>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <button style={{ marginRight: 20 }} onClick={createFormula} type="submit">Submit</button>
                    <button style={{ backgroundColor: 'red' }} onClick={closeAddNew} type="submit">Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/intro')
    window.location.reload();
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'rgb(100, 190, 67)', height: '100vh' }}>
        <div className='ContainInfo-Dashboard'>
          <img className='avatarAdmin-Dashboard' src='https://i.pinimg.com/564x/01/c7/51/01c751482ef7c4f5e93f3539efd27f6f.jpg' />
          <p style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>{name?.role}</p>
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
          <div className='Option-Dashboard' onClick={toggleFormulaForm} style={{
            backgroundColor: activeOption === 'formula' ? 'lightBlue' : 'initial',
            color: activeOption === 'voucher' ? '#fff' : 'initial',
          }}>
            <img style={{ width: 40, height: 40 }} src='https://cdn-icons-png.flaticon.com/128/6989/6989999.png' />
            <p style={{ fontSize: 18, marginLeft: 35, color: 'white' }}>Formula</p>
          </div>
          <div onClick={handleLogoutClick} style={{ marginTop: 100, marginLeft: 70 }}>
            <img style={{ width: 40, height: 40 }} src='https://cdn-icons-png.flaticon.com/128/10405/10405584.png' />
          </div>
        </div>
      </div>
      {showUserForm && <UserForm />}
      {showProductForm && <ProductForm />}
      {showOrderForm && <OrderForm tableOrder={tableOrder} />}
      {showVoucherForm && <VoucherForm />}
      {showAddVoucherForm && <AddVoucherForm />}
      {showFormulaForm && <FormulaForm />}
    </div>
  )
}
