import React, { useState, useEffect } from 'react';

// Client component
function ClientPage() {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu list from local server on component mount
  useEffect(() => {
    fetchMenuList();
  }, []);

  // Function to fetch menu list from local server
  const fetchMenuList = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/getMenu');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle ordering a menu item
  const handleOrderMenuItem = async (itemId) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      };
      const response = await fetch('http://localhost:8082/api/orderMenu', requestOptions);
      if (response.ok) {
        // Show success alert
        alert(`Ordered menu item with ID: ${itemId}`);
        // Fetch updated menu list
        fetchMenuList();
      } else {
        // Show error alert
        alert('Failed to order menu item.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Client Page</h1>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            {menuItem.foodName} - {menuItem.price}
            <button onClick={() => handleOrderMenuItem(menuItem.id)}>Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
