import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import WorkoutList from './components/WorkoutList';

import './App.css';

import { UserProvider } from './UserContext';

function App() {

    // Add a global user state
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUser(token);
    }, []);

    return (
        <UserProvider value={{user, setUser}}>
            <Router>
                <AppNavbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/workout-list" element={<WorkoutList/>} />
                        <Route path="/logout" element={<Logout/>} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
