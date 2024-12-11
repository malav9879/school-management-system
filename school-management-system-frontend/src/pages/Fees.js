import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const Fees = () => {
    const [fees, setFees] = useState([]);
    const [studentID, setStudentID] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const response = await apiClient.get('/fees');
            setFees(response.data);
        } catch (error) {
            console.error('Error fetching fees:', error);
        }
    };

    const handleAddFee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/fees', { studentID, amount, dueDate, status });
            alert('Fee record added successfully');
            fetchFees();
        } catch (error) {
            console.error('Error adding fee:', error);
        }
    };

    return (
        <div>
            <h1>Fee Management</h1>
            <form onSubmit={handleAddFee}>
                <input
                    type="text"
                    placeholder="Student ID"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Status (Paid/Unpaid)"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button type="submit">Add Fee</button>
            </form>
            <h2>Fee Records</h2>
            <ul>
                {fees.map((fee) => (
                    <li key={fee._id}>
                        Student: {fee.studentID}, Amount: {fee.amount}, Due Date: {fee.dueDate}, Status: {fee.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Fees;
