import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import Attendance from './pages/Attendance';
import Grades from './pages/Grades';
import Fees from './pages/Fees';
import Notifications from './components/Notifications';
import Dashboard from './pages/Dashboard';

const cors = require('cors');
app.use(cors())
const App = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

    return (
        <Router>
            {isLoggedIn && <Navbar />} {/* Show Navbar only if logged in */}
            <Routes>
                {!isLoggedIn ? (
                    <Route path="*" element={<LoginForm />} />
                ) : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/grades" element={<Grades />} />
                        <Route path="/fees" element={<Fees />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
