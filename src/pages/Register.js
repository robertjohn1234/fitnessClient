import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const {user} = useContext(UserContext);

	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);
    
    function registerUser(e) {
        e.preventDefault();
    
        fetch('https://fitness-trackerro.onrender.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            // Determine the returned data. Especially useful when the given API is online.
            console.log(data);
    
            // Check if the registration was successful
            if (data.message === 'Registered SUccessfully') {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
    
                Swal.fire({
                    title: 'Registration Successful',
                    icon: 'success',
                    text: 'Thank you for registering!'
                });
            } else {
                // Handle the case where registration was not successful
                Swal.fire({
                    title: 'Registration Failed',
                    icon: 'error',
                    text: data.message || 'An error occurred. Please try again.'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Registration Failed',
                icon: 'error',
                text: 'An error occurred. Please try again.'
            });
        });
    }
    

	useEffect(()=>{

        if((email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)){

          setIsActive(true)

        } else {

          setIsActive(false)

        }


	},[email,password,confirmPassword])
    

	return (

        <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                type="email"
                placeholder="Enter Email" 
                required 
                value={email} 
                onChange={e => {setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                required 
                value={password} 
                onChange={e => {setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Confirm Password" 
                required 
                value={confirmPassword} 
                onChange={e => {setConfirmPassword(e.target.value)}}/>
            </Form.Group>
            {
                isActive

                ? <Button variant="primary" type="submit">Submit</Button>
                : <Button variant="primary" disabled>Submit</Button>
            }
        </Form>
		
		)
}