import React, { useState, useEffect } from 'react';

const url = 'http://3.132.13.94:8080';

function OwnerPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editFoodName, setEditName] = useState('');
  const [editFoodPrice, setEditPrice] = useState('');

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
  // Function to create a new menu item on local server
  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if(!newFoodName) {
      alert("No, Please put in data!")
    } else {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName: newFoodName, price: newPrice }),
      };
      const response = await fetch(`${url}/addMenu`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        // Show success alert
        alert('Menu item created successfully!');
        // Fetch updated menu list
        fetchMenuList();
      } else {
        // Show error alert
        alert('Failed to create menu item.');
      }  
    } catch (error) {
      console.error(error);
    }
  }
  };

  // Function to delete a menu item on local server
const handleDeleteMenuItem = async (itemId, foodName) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foodName: foodName }),
    };
    const response = await fetch(`${url}/deleteMenu/${foodName}`, requestOptions);
    if (response.ok) {
      // Show success alert
      alert('Menu item deleted successfully!');
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
const handleEditMenuItem = async (item, foodName, price) => {
  let hiddencheck1 = document.getElementById("editer1");
  let hiddencheck2 = document.getElementById("editer2");

  hiddencheck1.type="text";
  hiddencheck2.type="text";
  
}
  // const edit = async (editFoodName, editFoodPrice) => {
    const addEditList = async (foodName, editFoodName, editFoodPrice) => {
      if (!editFoodName && !editFoodPrice) {
        return 0;
        alert("Put in the data!");
      } else if (!editFoodName && editFoodPrice) {
        setEditName = menuItems.foodName;
      } else if (!editFoodPrice && editFoodName) {
        setEditPrice = menuItems.price;
      } else {
    try {
    const requestOption = {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify({ oldFoodName : foodName, foodName : editFoodName, price : editFoodPrice}),
    }; 
  const response = await fetch(`${url}/updateMenu`, requestOption);
  if (response.ok) {
    // Show success alert
    alert('Menu item edited successfully!');
    // Fetch updated menu list
    fetchMenuList();
  } else {
    // Show error alert
    alert('Failed to edit menu item.');
  }
} catch(error) {
  console.error(error);
  }}
}



  return (
      <div class='box'>
      <h1>Owner Page</h1>
      <h2>Edit Meun list</h2>
      <form onSubmit={handleAddMenuItem}>
        <label>
          FoodName:
          <input type="text" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </label>
        <button type="submit">Add Menu Item</button>
      </form>
      <h2>[Menu list]</h2>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            {menuItem.foodName} - {menuItem.price}
            <button onClick={() => handleDeleteMenuItem(menuItem.id, menuItem.foodName)}>Delete</button>
            <button onClick={() => handleEditMenuItem(menuItem.id, menuItem.foodName)}>Edit</button>
            <form onSubmit={addEditList} >
            <input type='hidden' id='editer1' placeholder='New Food name' value={editFoodName} onChange={(e) => setEditName(e.target.value)}/>
            <input type='hidden' id='editer2' placeholder='New Food price' value={editFoodPrice} onChange={(e) => setEditPrice(e.target.value)}/>
            <button type='submit'>Do it!</button>
            </form>    
          </li>
        ))}
      </ul>
      <h2>[Order list]</h2>
      {orderItems.map((menuItem) => (
      <li key={menuItem.id}>
            {menuItem.foodName} - {menuItem.price}
            <button onClick={() => handleDeleteMenuItem(menuItem.id, menuItem.foodName)}>Delete</button>
  
          </li>
       ))}
      </div>
  ); 
}
export default OwnerPage;
