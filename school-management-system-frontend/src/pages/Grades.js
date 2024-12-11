import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [studentID, setStudentID] = useState('');
    const [subject, setSubject] = useState('');
    const [score, setScore] = useState('');

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await apiClient.get('/grades');
            setGrades(response.data);
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    };

    const handleAddGrade = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/grades', { studentID, subject, score });
            alert('Grade added successfully');
            fetchGrades();
        } catch (error) {
            console.error('Error adding grade:', error);
        }
    };

    return (
        <div>
            <h1>Grade Management</h1>
            <form onSubmit={handleAddGrade}>
                <input
                    type="text"
                    placeholder="Student ID"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
                <button type="submit">Add Grade</button>
            </form>
            <h2>Grade Records</h2>
            <ul>
                {grades.map((grade) => (
                    <li key={grade._id}>
                        Student: {grade.studentID}, Subject: {grade.subject}, Score: {grade.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Grades;
