import React, { useState, useEffect } from 'react';

const url = 'http://localhost:8082';

function ClientPage() {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu list from local server on component mount
  useEffect(() => {
    fetchMenuList();
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

  // Function to place an order for a menu item
  const handlePlaceOrder = async (itemId) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
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
    <>
      <h1>Client Page</h1>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            {menuItem.foodName} - {menuItem.price}
            <button onClick={() => handlePlaceOrder(menuItem.id)}>Place Order</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClientPage;
