import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../TabForm/TabForm.css'

function TabForm() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                <TabList>
                    <Tab style={{ fontSize: 20 }}>Mô Tả</Tab>
                    <Tab style={{ fontSize: 20 }}>Đánh Giá</Tab>
                    <Tab style={{ fontSize: 20 }}>Chính Sách</Tab>
                </TabList>
                <div className='form'>
                    <TabPanel>
                        {<p className='description'>– Phù hợp với nuôi chào mào có tật bu lồng, ngoái, lộn.
                            <br />
                            – Móc lồng bằng tre, cứng, đẹp.
                            <br />

                            – Thanh lồng mảnh, cứng tuyệt đối.
                            <br />

                            – Đi kèm bộ nan cao cấp.
                            <br />

                            – Đáy lồng làm bằng tre, đẹp, sang trọng.</p>}
                    </TabPanel>
                    <TabPanel>
                        {
                            <div>
                                <div style={{ marginLeft: 20 }}>
                                    <p style={{ fontSize: 22, fontWeight: 'bold' }}>Đánh giá</p>
                                    <p>Chưa có đánh giá nào.</p>
                                </div>
                                <div className='form-feedBackCage'>
                                    <p style={{ fontSize: 15, fontWeight: 'bold' }}>Hãy là người đầu tiên nhận xét “Lồng Vành Khuyên” </p>
                                    <p style={{ fontSize: 15, fontWeight: 'bold' }}>Nhận xét của bạn *</p>
                                    <input className='input-feedBack' />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p style={{ fontSize: 15, fontWeight: 'bold' }}>Tên *</p>
                                            <input className='input-inFo' />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 15, fontWeight: 'bold' }}>Email *</p>
                                            <input className='input-inFo' style={{ marginRight: 32 }} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className='button-feedBack'>Gửi Đi</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </TabPanel>
                    <TabPanel>
                        {<p className='description'>– Chính sách bảo hành của riêng mỗi hãng:
                            <br />
                            – CASIO: Bảo hành chính hãng máy 1 năm, pin 1,5 năm
                            <br />

                            – CITIZEN: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                            <br />

                            – SEIKO: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                            <br />

                            – ORIENT: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm</p>}
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
}

export default TabForm;
