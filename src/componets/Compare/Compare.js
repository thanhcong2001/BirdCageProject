import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export default function Compare() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
    ]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addToPopup = (product) => {
        setSelectedProducts([...selectedProducts, product]);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => addToPopup(product)}>Add to Popup</button>
                    </li>
                ))}
            </ul>
            <Popup open={isOpen} closeOnDocumentClick onClose={closePopup}>
                <div>
                    <h2>Selected Products</h2>
                    <ul>
                        {selectedProducts.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                    <button onClick={closePopup}>Close Popup</button>
                </div>
            </Popup>
        </div>
    )
}
