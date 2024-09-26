import { useState } from 'react'
import {Cart, ProductList} from './components'
import { Modal } from 'antd';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useCartContext } from './context/CartContext';

function App() {

  const {cartItems, totalOrderPrice, setCartItems} = useCartContext()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetCart = () => {
    setCartItems([]);
    setIsModalOpen(false);

  }

  return (
    <div className="container">
      <ProductList />
      <Cart setIsModalOpen={setIsModalOpen} />

      <Modal open={isModalOpen} footer={false} closeIcon={false}>
        <div>
          <IoIosCheckmarkCircleOutline size={28} color='var(--green)'/>
          <h1>Order Confirmed</h1>
          <p className="order-confirm-label">We hope you enjoy your food!</p>
          <div className='order-summary'>
            {
              cartItems.map((item, index) => (
                <div key={index} className='order-summary-row'>
                  <div className="order-item-container">
                    <div className="item-thumbnail-cintainer">
                      <img src={item.thumbnail} alt={item.name} loading='lazy'/>
                    </div>
                    <div className='item-details-container'>
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity-container">
                        <span className='item-quantity'>{item.quantity}x</span>
                        <span className='item-price'>@ ${item.price.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            }

            <div className="order-summary-row border-none">
              <p className="order-total-label">Order total</p>
              <h3 className="total-order-price">${totalOrderPrice.toFixed(2)}</h3>
            </div>
          </div>

          <button className="start-new-order" onClick={resetCart}>Start new order</button>
        </div>
      </Modal>
    </div>
  )
}

export default App
