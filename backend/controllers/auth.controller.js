import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// ------------------- Signup Controller -------------------
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = await genToken(user._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production (https)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({ user });

    } catch (error) {
        return res.status(500).json({ message: `Signup error: ${error.message}` });
    }
};

// ------------------- Login Controller -------------------
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email does not exist!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate token
        const token = await genToken(user._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: `Login error: ${error.message}` });
    }
};

// ------------------- Logout Controller -------------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token"); // small fix: clearCookie, not clearcookie
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Logout error: ${error.message}` });
    }
};
