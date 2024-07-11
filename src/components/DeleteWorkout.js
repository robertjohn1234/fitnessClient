import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteWorkout({ show, handleClose, workoutId, onWorkoutDeleted }) {
  const handleDelete = () => {
    if (!workoutId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    fetch(`https://fitness-trackerro.onrender.com/workouts/deleteWorkout/${workoutId}`, {
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
        onWorkoutDeleted(); // Refresh the workouts list
        handleClose(); // Close the modal
      })
      .catch(error => {
        console.error('Error deleting workout:', error);
        // Optionally handle error state or display a message to the user
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this workout?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
