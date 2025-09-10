import multer from 'multer';
import fs from 'fs';

// Create public directory if it doesn't exist
if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public', { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        // Add timestamp to prevent overwrites
        const timestamp = Date.now();
        cb(null, timestamp + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

export default upload;