import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        
        if (!userId) {
            return res.status(401).json({ message: "User ID not found in token" });
        }
        
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json(user);

    } catch (error) {
        console.error('Get current user error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        
        // Validate assistant name
        if (!assistantName || assistantName.trim() === '') {
            return res.status(400).json({ message: "Assistant name is required" });
        }

        let finalImageUrl;

        // Case 1: Custom image file uploaded
        if (req.file) {
            try {
                finalImageUrl = await uploadOnCloudinary(req.file.path);
            } catch (uploadError) {
                return res.status(500).json({ 
                    message: "Image upload failed", 
                    error: uploadError.message 
                });
            }
        } 
        // Case 2: Predefined image URL
        else if (imageUrl) {
            finalImageUrl = imageUrl;
        } 
        // Case 3: No image provided
        else {
            return res.status(400).json({ message: "Please select an image" });
        }

        // Update user in database
        const user = await User.findByIdAndUpdate(
            req.userId,
            { 
                assistantName: assistantName.trim(), 
                assistantImage: finalImageUrl
            },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Update assistant error:", error);
        return res.status(500).json({ 
            message: "Update assistant error",
            error: error.message 
        });
    }
};