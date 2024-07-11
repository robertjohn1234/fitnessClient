// src/components/UpdateWorkout.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function UpdateWorkout({ show, handleClose, workoutId, onWorkoutUpdated }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (show && workoutId) {
      const token = localStorage.getItem('token');
      fetch(`https://fitness-trackerro.onrender.com/workouts/${workoutId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setDuration(data.duration);
        })
        .catch(error => {
          console.error('Error fetching workout:', error);
        });
    }
  }, [show, workoutId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`https://fitness-trackerro.onrender.com/workouts/updateWorkout/${workoutId}`, {
      method: 'PATCH',
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
          throw new Error('Error updating workout');
        }
      })
      .then(data => {
        alert('Workout updated successfully');
        handleClose();
        onWorkoutUpdated(); // Notify parent component to reload the workouts list
      })
      .catch(error => {
        alert('Error updating workout');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWorkoutName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutDuration">
            <Form.Label>Duration:</Form.Label>
            <Form.Control
              type="text"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Edit Workout
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
