import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import "../../assets/css/order-history.css";
import axios from 'axios';


function OrderHistory() {
  const [fetchorders, setfetchorder] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user_id"));


  const port = process.env.REACT_APP_URL;


  const getorder = async (e) => {
    try {
      const res = await axios.get(`${port}/getorder`);
      setfetchorder(res.data);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getorder();
  }, [])
  return (
    <>
      <div className='content-order'>
        <div className="sub1-order">
          <p>Order History</p>
        </div>
        <div className='history-table'>
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th className='status'>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, index) => (
                fetchorders.map((item) => (
                  <tr key={index}>
                    <td data-label="Product">
                      <p>{item.payment_method}</p>
                    </td>
                    <td data-label="Status" className='status'><p>{item.order_status}</p></td>
                    <td data-label="Date"><p>{item.order_date}</p></td>
                    <td data-label="Total"><p>{item.total_amount}</p></td>
                    <td data-label="Action" className='action'>
                      {/* <NavLink to={"/Orders"}> <b><p> View Details</p> <i className="fa-solid fa-arrow-right"></i></b></NavLink> */}
                      <NavLink to={`/Orders/${item.order_id}`}>
                        <b>
                          <p> View Details</p>
                          <i className="fa-solid fa-arrow-right"></i>
                        </b>
                      </NavLink>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrderHistory;