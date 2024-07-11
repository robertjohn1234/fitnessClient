// src/components/WorkoutList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://fitness-trackerro.onrender.com/workouts/getMyWorkouts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {      
        setWorkouts(data.workouts);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });
  }, []);

  return (
    <div>
      <h2>My Workouts</h2>
      <Link to="/add-workout">Add Workout</Link>
      <ul>
        {workouts.map(workout => (
          <li key={workout._id}>
            {workout.name} - {workout.duration}
            <Link to={`/update-workout/${workout._id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
