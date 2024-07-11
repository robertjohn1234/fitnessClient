import { React, useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddWorkout({ show, handleClose, onWorkoutAdded }) {
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
        handleClose();
        onWorkoutAdded(); // Notify parent component to reload the workouts list
      })
      .catch(error => {
        alert('Error adding workout');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Workout</Modal.Title>
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
            Add Workout
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
