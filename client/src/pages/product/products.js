
// import React, { useEffect, useState } from 'react';
// import { NavLink, useParams } from 'react-router-dom';
// import axios from 'axios';
// import "../../assets/css/product.css";

// const port = process.env.REACT_APP_URL;

// function Products() {
//   const { id } = useParams();
//   const [fetchProducts, setFetchProducts] = useState([]);
//   const [category, setCategory] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     setFetchProducts([]); // Reset product list when category changes
//     setPage(1);
//     setHasMore(true);
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       getProductsByCategory(id);
//       getCategoryName(id);
//     } else {
//       getAllProducts();
//     }
//   }, [id, page]);

//   const getProductsByCategory = async (categoryId) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:4800/getproductsbycategoryid/${categoryId}`);
//       setFetchProducts(res.data); // Show all products at once
//       setHasMore(false); // No Load More for category
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:4800/getpaginatedproducts?page=${page}&limit=4`);
//       setFetchProducts(prev => [...prev, ...res.data]);
//       setHasMore(res.data.length === 4);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   const getCategoryName = async (categoryId) => {
//     try {
//       const res = await axios.get(`http://localhost:4800/getcategorybyid/${categoryId}`);
//       setCategory(res.data[0]);
//       localStorage.setItem("name", res.data[0]?.name || '');
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   const filteredProducts = fetchProducts.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const truncateString = (str, maxLength) => {
//     return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
//   };

//   const loadMoreProducts = () => {
//     if (!loading && hasMore) {
//       setPage(prev => prev + 1);
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='product-search-section'>
//         <input
//           type='text'
//           placeholder='Search products...'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className='product-section'>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((item) => {
//             const discountAmount = (item.price * item.discount) / 100;
//             const discountedPrice = item.price - discountAmount;

//             return (
//               <NavLink to="/item" state={{ id: item.product_id }} key={item.product_id}>
//                 <div className='products-card'>
//                   <div className='products-img'>
//                     {JSON.parse(item.img || "[]")[0] && (
//                       <img
//                         src={`/uploads/${JSON.parse(item.img || "[]")[0]}`}
//                         alt="product"
//                         width="100px"
//                       />
//                     )}
//                   </div>
//                   <div className='products-name'>
//                     <p>{truncateString(item.title, 25)}</p>
//                   </div>
//                   <div className='products-price'>
//                     <p className='products-original-price'>₹{item.price}</p>
//                     <p className='products-discount-price'>₹{discountedPrice.toFixed(2)}</p>
//                   </div>
//                   <div className='products-disc'>
//                     <p>{item.discount}% off</p>
//                   </div>
//                 </div>
//               </NavLink>
//             );
//           })
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>

//       {/* Load More only for All Products */}
//       {!id && hasMore && !loading && (
//         <div className="product-load-more-container">
//           <button className="product-load-more-btn" onClick={loadMoreProducts}>
//             Load More
//           </button>
//         </div>
        
//       )}

//       {loading && <p>Loading...</p>}
//     </div>
//   );
// }

// export default Products;















import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../assets/css/product.css";

const port = process.env.REACT_APP_URL;

function Products() {
  const { id } = useParams();
  const [fetchProducts, setFetchProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setFetchProducts([]); // Reset product list when category changes
    setPage(1);
    setHasMore(true);
  }, [id]);

  useEffect(() => {
    if (id) {
      getProductsByCategory(id);
      getCategoryName(id);
    } else {
      getAllProducts();
    }
  }, [id, page]);

  const getProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4800/getproductsbycategoryid/${categoryId}?page=${page}&limit=4`);
      setFetchProducts(prev => page === 1 ? res.data : [...prev, ...res.data]);
      setHasMore(res.data.length === 4);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4800/getpaginatedproducts?page=${page}&limit=4`);
      setFetchProducts(prev => [...prev, ...res.data]);
      setHasMore(res.data.length === 4);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getCategoryName = async (categoryId) => {
    try {
      const res = await axios.get(`http://localhost:4800/getcategorybyid/${categoryId}`);
      setCategory(res.data[0]);
      localStorage.setItem("name", res.data[0]?.name || '');
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      // If search is cleared, reset to normal view
      setFetchProducts([]); // Clear existing products first
      setPage(1);
      if (id) {
        getProductsByCategory(id);
      } else {
        getAllProducts();
      }
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4800/searchproducts?term=${searchTerm}`);
      setFetchProducts(res.data);
      setHasMore(false); // No need for Load More when showing search results
      setLoading(false);
    } catch (error) {
      console.error("Error searching:", error);
      setLoading(false);
    }
  };

  const truncateString = (str, maxLength) => {
    return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className='container'>
      <div className='product-search-section'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>

      <div className='product-section'>
        {fetchProducts.length > 0 ? (
          fetchProducts.map((item) => {
            const discountAmount = (item.price * item.discount) / 100;
            const discountedPrice = item.price - discountAmount;

            return (
              <NavLink to="/item" state={{ id: item.product_id }} key={item.product_id}>
                <div className='products-card'>
                  <div className='products-img'>
                    {JSON.parse(item.img || "[]")[0] && (
                      <img
                        src={`/uploads/${JSON.parse(item.img || "[]")[0]}`}
                        alt="product"
                        width="100px"
                      />
                    )}
                  </div>
                  <div className='products-name'>
                    <p>{truncateString(item.title, 25)}</p>
                  </div>
                  <div className='products-price'>
                    <p className='products-original-price'>₹{item.price}</p>
                    <p className='products-discount-price'>₹{discountedPrice.toFixed(2)}</p>
                  </div>
                  <div className='products-disc'>
                    <p>{item.discount}% off</p>
                  </div>
                </div>
              </NavLink>
            );
          })
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Load More button now works for both All Products and Category views */}
      {hasMore && !loading && (
        <div className="product-load-more-container">
          <button className="product-load-more-btn" onClick={loadMoreProducts}>
            Load More
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Products;