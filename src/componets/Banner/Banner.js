import { Carousel } from 'antd';
import React from 'react';
function Banner(props) {
    return (
        <Carousel autoplay>
            <img src="http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/banner2-2.jpg" alt="" />
            <img src="http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/banner03.jpg" alt="" />
            <img src="http://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/banner4.jpg" alt="" />
        </Carousel>
    );
}

export default Banner;