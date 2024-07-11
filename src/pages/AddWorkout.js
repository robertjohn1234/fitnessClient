// src/components/AddWorkout.js
import React, { useState } from 'react';

function AddWorkout() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('https://fitness-trackerro.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, duration })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error adding workout');
        }
      })
      .then(data => {
        alert('Workout added successfully');
      })
      .catch(error => {
        alert('Error adding workout');
      });
  };

  return (
    <div>
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" value={duration} onChange={e => setDuration(e.target.value)} required />
        </div>
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
}

export default AddWorkout;
