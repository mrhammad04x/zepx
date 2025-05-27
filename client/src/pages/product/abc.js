import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../../assets/css/product.css";

const port = process.env.REACT_APP_URL;


function Products() {
    const { id } = useParams();


    const [fetchProducts, setFetchProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products by category ID
    useEffect(() => {
        if (id) {
            getProductsById(id);
            getcategory(id);
        } else {
            getAllProducts();
        }
    }, [id]);

    const getProductsById = async () => {
        try {

            const res = await axios.get(`http://localhost:4800/getproductsbycategoryid/${id}`);
            setFetchProducts(res.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getproducts`);
            setFetchProducts(res.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const getcategory = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getcategorybyid/${id}`);
            setCategory(res.data[0]);
            localStorage.setItem("name", res.data[0].name);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    // Filter products based on search term
    useEffect(() => {
        const results = fetchProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Calculate total price for each product
        const resultsWithTotalPrices = results.map(item => {
            // Convert string values to numbers with fallbacks to 0
            const price = Number(item.price) || 0;
            const tax = Number(item.tax) || 0;
            const discount = Number(item.discount) || 0;
            const shipping = Number(item.shipping) || 0;

            // Calculate all components
            const taxAmount = (price * tax) / 100;
            const discountAmount = (price * discount) / 100;
            const discountedPrice = price - discountAmount;
            const total = price + shipping + taxAmount - discountAmount;

            // Return product with calculated price values
            return {
                ...item,
                calculatedPrice: {
                    taxAmount,
                    discountAmount,
                    discountedPrice,
                    total
                }
            };
        });

        setFilteredProducts(resultsWithTotalPrices);
    }, [searchTerm, fetchProducts]);



    // Truncate product name if it exceeds the max length
    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };



    return (
        <div>
            <div className='container'>
                <div className='product-search-section'>
                    <input
                        type='text'
                        placeholder='Search products...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='product-section'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            // <NavLink to={`/item/${item.product_id}`} key={item.product_id}>
                            <NavLink to="/item" state={{ id: item.product_id }}>
                                <div className='products-card'>
                                    <div className='products-img'>
                                        {JSON.parse(item.img || "[]")[0] && (
                                            <img src={`/uploads/${JSON.parse(item.img || "[]")[0]}`} alt="product" width="100px" />
                                        )}
                                    </div>
                                    <div className='products-name'>
                                        <p>{truncateString(item.title, 24)}</p>
                                    </div>
                                    <div className='products-price'>
                                        <p className='products-original-price'>₹{item.price}</p>
                                        <p className='products-discount-price'>₹{item.calculatedPrice.total.toFixed(0)}</p>
                                    </div>
                                    <div className='products-disc'>
                                        <p>{item.discount}% off</p>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Products;

