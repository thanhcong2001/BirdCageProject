import React,{useState} from 'react'
import '../Customize/CustomCage.css'
export default function CustomCage() {
    const images = [
        'https://o.remove.bg/downloads/fd55329f-8453-4406-9d5b-5886fbb1e08e/4-9-removebg-preview.png',
        'https://mauweb.monamedia.net/birdshop/wp-content/uploads/2018/04/01-3.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const previousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    return (
        <div style={{ alignContent: 'center' }}>
            <img className='customCage-img' src={images[currentImageIndex]} />
            <div>
                <button onClick={previousImage}>Back</button>
                <button onClick={nextImage}>Next</button>
            </div>
        </div>
    )
}
