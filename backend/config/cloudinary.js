import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(filepath)  // Fixed: use filepath parameter
        
        fs.unlinkSync(filepath)
        return uploadResult.secure_url
        
    } catch (error) {
        fs.unlinkSync(filepath)
        throw new Error("Cloudinary upload error")  // Fixed: proper error handling
    }
}

export default uploadOnCloudinary