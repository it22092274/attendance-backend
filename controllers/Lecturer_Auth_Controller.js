const { LecturerModel } = require("../models/LecturerModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const lecturer_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const lecturer = await LecturerModel.findOne({ email });

        if (!lecturer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, lecturer.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { email: lecturer.email, id: lecturer._id },
            'myVeryLongAndSecureSecretKeyForJWT123456',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ result: lecturer, token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const profile = async (req, res) => {
    const { email } = req.body;

    try {
        const userProfile = await LecturerModel.findOne({ email });

        if (!userProfile) {
            return res.status(401).json({ message: 'Profile not found' });
        }

        return res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const lecturer = await LecturerModel.findOne({ email });

        if (!lecturer) {
            return res.status(401).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        lecturer.password = hashedPassword;
        await lecturer.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    lecturer_login,
    profile,
    resetPassword
};
