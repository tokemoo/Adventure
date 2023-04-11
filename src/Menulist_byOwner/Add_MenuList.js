import React, { useState } from 'react';

const url = 'http://localhost:8082';
function Add_MenuList() {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState(0);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (check) => {
    check.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName, price }),
      };
      const response = await fetch(url+"/addMenu", requestOptions);
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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          FoodName:
          <input type="text" value={foodName} onChange={(check) => setFoodName(check.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(check) => setPrice(check.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </>
  );
}

export default Add_MenuList;