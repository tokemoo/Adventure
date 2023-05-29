import React, { useState, useEffect } from 'react';

const url = 'http://3.132.13.94:8080';

function ClientPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [newOrder, setNewOrder] = useState('');
  const [orderNum, setOrderNum] = useState(0);

  // Fetch menu list from local server on component mount
  useEffect(() => {
    fetchMenuList();
    fetchOrderList();
  }, []);
  

  // Function to fetch menu list from local server
  const fetchMenuList = async () => {
    try {
      const response = await fetch(`${url}/getMenu`);
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderList = async () => {
    try {
      const response = await fetch(`${url}/order`);
      const data = await response.json();
      setOrderItems(data);
    } catch (error) {
      console.error(error);
    }
  }
  // const handleAddOrder = () => {
  //   if (!newOrder) {
  //     alert('Please input data!');
  //   } else if (orderNum <= 0) {
  //     alert('Please input a valid quantity!');
  //   } else {
  //     setOrderNum(orderNum + 1);
  //     setOrderItems([...orderItems, { foodName: newOrder, numberOfFood :orderNum }]);
  //     setNewOrder('');
  //     setOrderNum(1);
  //   }
  // };
  //Function to place an order for a menu item
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName : newOrder, numberOfFood : orderNum }),
      };
      const response = await fetch(`${url}/order`, requestOptions);
      if (response.ok) {
        // Show success alert
        alert('Order placed successfully!');
        // Fetch updated menu list
        fetchMenuList();
      } else {
        // Show error alert
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //   <div>
    //     <h1>Client Page</h1>
    //     <h2>Order List:</h2>
    //     <ul>
    //       {orderItems.map((orderItems, index) => (
    //         <li key={index}>
    //         {orderItems.foodName} - {orderItems.orderNum}
    //         </li>
    //       ))}
    //     </ul>
    //     <h2>Menu List:</h2>
    //     <ul>
    //       {menuItems.map((menuItem, index) => (
    //         <li key={index}>{menuItem.foodName} - {menuItem.price}</li>
    //       ))}
    //     </ul>
    //     <h2>Add Order:</h2>
    //     <input
    //       type="text"
    //       placeholder="Food Name"
    //       value={newOrder}
    //       onChange={(e) => setNewOrder(e.target.value)}
    //     />
    //     <input 
    //     type='number'
    //     placeholder='Qunatity'
    //     value={orderNum} onChange={(e) => setOrderNum(parseInt(e.target.value))} 
    //     />
    //     <button onClick={handleAddOrder}>Add Order</button>
    //   </div>
    // );

    <>
    <div class='box2'>
      <h1>Client Page</h1>
      <h2>[Menu list]</h2>
      <form onSubmit={handlePlaceOrder}>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            <label>
            {menuItem.foodName} - {menuItem.price}
            <input type="number" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} />
            </label>
            <button onClick={() => handlePlaceOrder(orderItems.newOrderName)}>Place Order</button>
          </li>
        ))}
        <button type='submit'>Orderlist</button>
      </ul>
      <h2>[Order list]</h2>
      {orderItems.map((menuItem) => (
      <li key={menuItem.id}>
            {menuItem.foodName} - {menuItem.price}
            {/* <button onClick={() => handleDeleteMenuItem(menuItem.id, menuItem.foodName)}>Delete</button> */}
  
          </li>
       ))}
      </form>
      
      </div>
    </>
  );
}

export default ClientPage;
