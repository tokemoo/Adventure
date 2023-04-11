import React, { useState, useEffect } from 'react';

// Owner component
function OwnerPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newPrice, setNewPrice] = useState('');

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

  // Function to handle adding a new menu item
  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName: newFoodName, price: newPrice }),
      };
      const response = await fetch('http://localhost:8082/api/addMenu', requestOptions);
      const data = await response.json();
      if (response.ok) {
        // Show success alert
        alert('Menu item created successfully!');
        // Fetch updated menu list
        fetchMenuList();
        // Reset input fields
        setNewFoodName('');
        setNewPrice('');
      } else {
        // Show error alert
        alert('Failed to create menu item.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deleting a menu item
  const handleDeleteMenuItem = async (itemId) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`http://localhost:8082/api/deleteMenu/${itemId}`, requestOptions);
      if (response.ok) {
        // Show success alert
        alert(`Deleted menu item with ID: ${itemId}`);
        // Fetch updated menu list
        fetchMenuList();
      } else {
        // Show error alert
        alert('Failed to delete menu item.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Owner Page</h1>
      <form onSubmit={handleAddMenuItem}>
        <label>
          Food Name:
          <input type="text" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </label>
        <button type="submit">Add Menu Item</button>
      </form>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            {menuItem.foodName} - {menuItem.price}
            <button onClick={() => handleDeleteMenuItem(menuItem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}