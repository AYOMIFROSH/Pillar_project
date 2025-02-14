const validateUserData = (data) => {
    // Validate Name
    if (typeof data.Name !== 'string' || data.Name.trim() === '') {
        throw new Error('Invalid Name');
    }

    // Validate email
    if (typeof data.email !== 'string' || !/\S+@\S+\.\S+/.test(data.email)) {
        throw new Error('Invalid email');
    }

    // Ensure role is set to 'user' by default if not provided
    if (!data.role) {
        data.role = 'user';
    } else if (typeof data.role !== 'string') {
        throw new Error('Invalid role');
    }

    // Validate password
    if (typeof data.password !== 'string' || data.password.length < 6) {
        throw new Error('Invalid password');
    }

    // Validate verified flag
    // Validate verified flag and set default to false if not provided
    if (typeof data.verified !== 'boolean') {
        data.verified = false;  // Set to default if not a boolean
    }

    // Optional fields validation (gmailToken, resetToken, refreshtTokenExpiry)
    if (data.gmailToken && typeof data.gmailToken !== 'object') {
        throw new Error('Invalid gmailToken');
    }

    if (data.resetToken && typeof data.resetToken !== 'string') {
        throw new Error('Invalid resetToken');
    }

    if (data.resetTokenExpiry && !(data.resetTokenExpiry instanceof Date)) {
        throw new Error('Invalid resetTokenExpiry');
    }
};

module.exports = { validateUserData };

