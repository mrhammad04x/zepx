import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/checkout.css";
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const port = process.env.REACT_APP_URL;


function CheckOut() {
    const location = useLocation();
    const navigate = useNavigate();

    const fromCart = location.state?.fromCart;
    const fromItem = location.state?.fromItem;
    
    // Get data based on source page
    const cartItems = location.state?.cartItems || [];
    const cartSummary = location.state?.summary || {};
    
    // Single product data (from Item.js)
    const singleItem = location.state?.singleItem || {};
    const productData = fromItem ? singleItem.product : location.state?.productData;
    const productQuantity = fromItem ? singleItem.quantity : (location.state?.quantity || 1);
    
    // Get first image from product if available
    const productImages = productData && productData.img ? JSON.parse(productData.img || "[]") : [];
    const productImage = productImages.length > 0 ? productImages[0] : null;

  

  

 

    const truncateString = (str, maxLength) => {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    };

    const calculateOrderSummary = () => {
        // If coming from Cart page
        if (fromCart) {
            return {
                subtotal: cartSummary.subTotal || 0,
                shipping: 0,
                discount: cartSummary.discount || 0,
                tax: cartSummary.tax || 0,
                total: cartSummary.total || 0
            };
        }
    
        // If coming from Item page with singleItem
        if (fromItem && singleItem && singleItem.product) {
            const product = singleItem.product;
            const quantity = singleItem.quantity;
            
            // Get the discounted price
            const discountAmount = (product.price * (product.discount)) / 100;
            const discountedPrice = product.price - discountAmount;
            
            // Calculate totals
            const subtotal = discountedPrice * quantity;
            const shipping = product.shipping || 0;
            const discount = discountAmount * quantity;
            const tax = ((product.tax) / 100) * (product.price * quantity);
            const total = (subtotal + shipping + tax);
            
            return {
                subtotal,
                shipping,
                discount,
                tax,
                total
            };
        }
    
        // Fallback calculation if neither of the above conditions match
        if (!productData) return {
            subtotal: 0,
            shipping: 0,
            discount: 0,
            tax: 0,
            total: 0
        };
    
        const price = productData.price;
        const discount = ((productData.discount) / 100) * price;
        const discountedPrice = price - discount;
        
        const subtotal = discountedPrice * productQuantity;
        const shipping = productData.shipping ;
        const discountTotal = discount * productQuantity;
        const tax = ((productData.tax ) / 100) * (price * productQuantity);
        const total = subtotal + shipping + tax;
    
        return {
            subtotal,
            shipping,
            discount: discountTotal,
            tax,
            total
        };
    };

    const orderSummary = calculateOrderSummary();

    // For debugging
    useEffect(() => {
        
    }, [location.state, fromCart, fromItem, productData, singleItem]);


    
    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='checkOut'>
                    <form onSubmit={handleSubmit}>
                        <div className='checkOut-section'>
                            <div className='chekout-address'>
                                <div className='chekout-address-section'>
                                    <div className='chekout-address-heading'>
                                        <p>Billing Information</p>
                                    </div>
                                    <div className='chekout-address-information'>
                                        <div className='chekout-name-section'>
                                            <div className='chekout-name'>
                                                <div className='div'>
                                                    <label>User Name</label>
                                                </div>
                                                <div className='checkout-names'>
                                                    <input
                                                        type="text"
                                                        placeholder='First name'
                                                        id="firstName"
                                                        name="first_name"
                                                    />
                                                    <input type='text' placeholder='Last name' id="lastName" />
                                                </div>
                                            </div>
                                            <div className='chekout-compnay-name'>
                                                <div className='div'>
                                                    <label>Compnay Name <span className='optional'>(Optional)</span></label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='Enter Your Compnay Name' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-address'>
                                            <div className='checkout-address-section'>
                                                <div className='div'>
                                                    <label>Address</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='Enter Your Address' id="address" />
                                                </div>
                                            </div>
                                            <div className='checkout-zipcode'>
                                                <div className='div'>
                                                    <label>Zip Code</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='ex.123456'  />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='checkout-conatct'>
                                            <div className='checkout-email checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Email</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='example.@gmail.com' id="email"  />
                                                </div>
                                            </div>
                                            <div className='checkout-number checkout-conatct-info'>
                                                <div className='div'>
                                                    <label>Phone Number</label>
                                                </div>
                                                <div className='div'>
                                                    <input type='text' placeholder='ex.1234567890'  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chekout-payment-section'>
                                    <div className='payment-section'>
                                        <div className='payment-section-heading'>
                                            <p>Payment Option</p>
                                        </div>
                                        <div className='payment-type-section'>
                                            <div className='payment-type'>
                                                <i className="fa-solid fa-hand-holding-dollar"></i>
                                                <p>Cash on Delivery</p>
                                                <input type='radio' name="payment" />
                                            </div>
                                            <div className='payment-type payment'>
                                                <i className="fa-solid fa-credit-card"></i>
                                                <p>Online Payment</p>
                                                <input type='radio' name="payment" />
                                            </div>
                                            <div className='payment-type'>
                                                <i className="fa-brands fa-google-wallet"></i>
                                                <p>My Wallet</p>
                                                <input type='radio' name="payment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chekout-additionl-section'>
                                    <div className='additionl-section-heading'>
                                        <p>Additional Information</p>
                                    </div>
                                    <div className='div'>
                                        <label>Order Notes <span className='optional'>(Optional)</span></label>
                                    </div>
                                    <div className='div'>
                                        <textarea placeholder='Notes about your order, e.g. special notes for delivery' />
                                    </div>
                                </div>
                            </div>
                            <div className='chekout-product'>
                                <div className='chekout-product-section'>
                                    <div className='chekout-product-heading'>
                                        <p>Order Summary</p>
                                    </div>
                                    
                                    {/* Display cart items if coming from cart */}
                                    {fromCart && cartItems.length > 0 ? (
                                        <div className='chekout-item-contiant'>
                                            {cartItems.filter(item => item.product).map((item, index) => (
                                                <div className='chekout-item' key={item.product_id}>
                                                    <div className='chekout-item-img-section'>
                                                        <div className='chekout-item-img'>
                                                            {item.product && item.product.img ? (
                                                                JSON.parse(item.product.img || "[]")[0] && (
                                                                    <img src={`/uploads/${JSON.parse(item.product.img || "[]")[0]}`} alt={item.product.title} />
                                                                )
                                                            ) : (
                                                                <img src={require("../../assets/images/item1.png")} alt='Product' />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='chekout-item-section'>
                                                        <div className='chekout-item-name'>
                                                            <p>{truncateString(item.product.title, 28)}</p>
                                                        </div>
                                                        <div className='chekout-item-quantity'>
                                                            <p className='checkout-bill-font'>{item.quantity} × <span>₹{item.product.price}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : fromItem && productData ? (
                                        // Display single product if coming from item page
                                        <div className='chekout-item-contiant'>
                                            <div className='chekout-item'>
                                                <div className='chekout-item-img-section'>
                                                    <div className='chekout-item-img'>
                                                        {productImage ? (
                                                            <img src={`/uploads/${productImage}`} alt={productData.title} />
                                                        ) : (
                                                            <img src={require("../../assets/images/item1.png")} alt='Product' />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='chekout-item-section'>
                                                    <div className='chekout-item-name'>
                                                        <p>{truncateString(productData.title, 31)}</p>
                                                    </div>
                                                    <div className='chekout-item-quantity'>
                                                        <p className='checkout-bill-font'>{productQuantity} × <span>₹{productData.price}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='chekout-item-contiant'>
                                            <p>No product selected. Please go back and select a product.</p>
                                        </div>
                                    )}
                                            
                                    <div className='chekout-bill'>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Sub-total</p>
                                            <p>₹{orderSummary.subtotal.toFixed(0)}.00</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Shipping</p>
                                            <p>{orderSummary.shipping > 0 ? `₹${orderSummary.shipping.toFixed(0)}.00` : 'Free'}</p>
                                        </div>
                                        <div className='checkout-bill-price'>
                                            <p className='checkout-bill-font'>Discount</p>
                                            <p>–₹{orderSummary.discount.toFixed(0)}.00</p>
                                        </div>
                                        <div className='checkout-bill-price checkout-bill-border'>
                                            <p className='checkout-bill-font'>Tax</p>
                                            <p>₹{orderSummary.tax.toFixed(0)}.00</p>
                                        </div>
                                        <div className='checkout-bill-total'>
                                            <p>Total</p>
                                            <p>₹{orderSummary.total.toFixed(0)}.00</p>
                                        </div>
                                    </div>
                                    <div className="chekout-product-button">
                                        <button type="submit">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckOut