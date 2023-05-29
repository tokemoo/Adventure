import React, { useState } from 'react';

const url = 'http://localhost:8082';
function addDeleteMenuList() {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState(0);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName, price }),
      };
      const response = await fetch(url+"/api/addMenu", requestOptions);
      const data = await response.json();
      setResponse(data);
      if (response.ok) {
        // Show success alert
        alert('Data sent successfully!');
      } else {
        // Show error alert
        alert('Failed to send data.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName, price }),
      };
      const response = await fetch(url+"/api/deleteMenu", requestOptions);
      const data = await response.json();
      setResponse(data);
      if (response.ok) {
        // Show success alert
        alert('Data deleted successfully!');
      } else {
        // Show error alert
        alert('Failed to delete data.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          FoodName:
          <input type="text" value={foodName} onChange={(event) => setFoodName(event.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}

export default addDeleteMenuList;
