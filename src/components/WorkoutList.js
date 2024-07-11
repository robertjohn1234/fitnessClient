import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import AddWorkout from './AddWorkout';
import UpdateWorkout from './UpdateWorkout';
import DeleteWorkout from './DeleteWorkout'; // Import DeleteWorkout component
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function WorkoutList() {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const fetchWorkouts = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    fetch('https://fitness-trackerro.onrender.com/workouts/getMyWorkouts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        return response.json();
      })
      .then(data => {
        if (data.workouts && data.workouts.length > 0) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        // Optionally handle error state or display a message to the user
      });
  };

  const updateWorkoutStatus = (id, status) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    fetch(`https://fitness-trackerro.onrender.com/workouts/completeWorkoutStatus/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update workout status');
        }
        return response.json();
      })
      .then(data => {
        fetchWorkouts(); // Refresh the workouts list
      })
      .catch(error => {
        console.error('Error updating workout status:', error);
        // Optionally handle error state or display a message to the user
      });
  };

  const deleteWorkout = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    fetch(`https://fitness-trackerro.onrender.com/workouts/deleteWorkout/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete workout');
        }
        return response.json();
      })
      .then(data => {
        fetchWorkouts(); // Refresh the workouts list
      })
      .catch(error => {
        console.error('Error deleting workout:', error);
        // Optionally handle error state or display a message to the user
      });
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowUpdateModal = (id) => {
    setCurrentWorkoutId(id);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setCurrentWorkoutId(null);
    setShowUpdateModal(false);
  };

  const handleShowDeleteModal = (id) => {
    setCurrentWorkoutId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setCurrentWorkoutId(null);
    setShowDeleteModal(false);
  };

  return (
    !user ? (
      <Navigate to='/login' />
    ) : (
      <div className="container mt-4">
        <h2>My Workouts</h2>
        <Button onClick={handleShowAddModal} className="mb-3">Add Workout</Button>
        <div className="row">
          {workouts.map(workout => (
            <div className="col-md-4 mb-3" key={workout._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{workout.name}</Card.Title>
                  <Card.Text>Duration: {workout.duration}</Card.Text>
                  <Card.Text>
                    Status: <span className={workout.status === 'pending' ? 'text-danger' : 'text-primary'}>{workout.status}</span>
                  </Card.Text>
                  <Button className="btn btn-primary" onClick={() => handleShowUpdateModal(workout._id)}>Update</Button>
                  <Button className="btn btn-secondary" onClick={() => updateWorkoutStatus(workout._id, 'Completed')}>Mark as Completed</Button>
                  <Button className="btn btn-danger" onClick={() => handleShowDeleteModal(workout._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <AddWorkout show={showAddModal} handleClose={handleCloseAddModal} onWorkoutAdded={fetchWorkouts} />
        <UpdateWorkout show={showUpdateModal} handleClose={handleCloseUpdateModal} workoutId={currentWorkoutId} onWorkoutUpdated={fetchWorkouts} />
        <DeleteWorkout show={showDeleteModal} handleClose={handleCloseDeleteModal} workoutId={currentWorkoutId} onWorkoutDeleted={fetchWorkouts} />
      </div>
    )
  );
}
