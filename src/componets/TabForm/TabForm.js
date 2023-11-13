import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../TabForm/TabForm.css'
import CommentSection from './Comment/CommentSection';
import apiClient from 'api/apiClient';
import useProduct from 'api/apiProduct/useProduct';

function TabForm({ id, reviews }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [list, setList] = useState([])

    const { bird, birdIdLoading } = useProduct({ id })

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
                        {<p className='description'>
                            – {bird?.description}</p>}
                    </TabPanel>
                    <TabPanel>
                        {
                            <CommentSection id={id} reviews={reviews} />
                        }
                    </TabPanel>
                    <TabPanel>
                        {<p className='description'>– GIAO HÀNG COD TOÀN QUỐC
                            <br />
                            – HOÀN TRẢ LẠI TIỀN
                            <br />

                            – HỖ TRỢ 24/7
                            <br /></p>}
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
}

export default TabForm;
