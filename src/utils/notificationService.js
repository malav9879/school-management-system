const Notification = require('../models/Notification');

// Send a notification to a user
const sendNotification = async (userID, message, type) => {
    try {
        const notification = new Notification({ userID, message, type });
        await notification.save();
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
};

module.exports = { sendNotification };
