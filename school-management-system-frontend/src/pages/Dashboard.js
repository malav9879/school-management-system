import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const Dashboard = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [attendanceStats, setAttendanceStats] = useState({});
    const [feeStats, setFeeStats] = useState({});

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [studentsRes, teachersRes, attendanceRes, feeRes] = await Promise.all([
                apiClient.get('/students'),
                apiClient.get('/users?role=Teacher'),
                apiClient.get('/attendance/stats'),
                apiClient.get('/fees/stats'),
            ]);

            setTotalStudents(studentsRes.data.length);
            setTotalTeachers(teachersRes.data.length);
            setAttendanceStats(attendanceRes.data);
            setFeeStats(feeRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">
                            Total Students: {totalStudents}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-secondary text-white mb-4">
                        <div className="card-body">
                            Total Teachers: {totalTeachers}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-success text-white mb-4">
                        <div className="card-body">
                            Attendance - Present: {attendanceStats.present || 0}, Absent: {attendanceStats.absent || 0}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-danger text-white mb-4">
                        <div className="card-body">
                            Fees - Paid: {feeStats.paid || 0}, Unpaid: {feeStats.unpaid || 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
