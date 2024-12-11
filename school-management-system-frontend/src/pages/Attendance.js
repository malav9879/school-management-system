import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [studentID, setStudentID] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await apiClient.get('/attendance');
            setAttendance(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const handleAddAttendance = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/attendance', { studentID, status, date });
            alert('Attendance added successfully');
            fetchAttendance();
        } catch (error) {
            console.error('Error adding attendance:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Attendance Management</h1>
            <form className="mb-4" onSubmit={handleAddAttendance}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Student ID"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Status (Present/Absent)"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Attendance</button>
            </form>
     
            <h2>Attendance Records</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record) => (
                        <tr key={record._id}>
                            <td>{record.studentID}</td>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );     
};

export default Attendance;
