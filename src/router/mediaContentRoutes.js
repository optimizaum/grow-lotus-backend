import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import { deleteGallery, getAllGallery, getGalleryById, createGallery } from '../controller/galleryController.js';
import { createServices, deleteServices, editServices, getServices, getServicesById } from '../controller/servicesController.js';
import { createBlogs, deleteBlogs, editBlogs, getAllBlogs, getBlogsById } from '../controller/blogsController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import Adminonly from '../middleware/AdminOnly.js';

const mediaContentRoute = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create upload folder if it doesn't exist
const uploadFolder = join(__dirname, '../upload');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Setup multer for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // store in /upload folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});

const upload = multer({ storage });

// Image file preview Route
mediaContentRoute.get('/preview/:filename', (req , res) => {
  res.sendFile(join(__dirname, '../upload', req.params.filename));
});

// Route for Services
mediaContentRoute.post("/services",isAuthenticated , Adminonly , upload.single('file'), createServices);
mediaContentRoute.get("/services", getServices);
mediaContentRoute.get("/services/:id", getServicesById);
mediaContentRoute.patch("/services/:id",isAuthenticated , Adminonly , editServices);
mediaContentRoute.delete("/services/:id",isAuthenticated , Adminonly , deleteServices);

// Route for Blogs
mediaContentRoute.post("/blogs",isAuthenticated , Adminonly , upload.single('file'), createBlogs);
mediaContentRoute.get("/blogs", getAllBlogs);
mediaContentRoute.get("/blogs/:id", getBlogsById);
mediaContentRoute.patch("/blogs/:id",isAuthenticated , Adminonly , editBlogs);
mediaContentRoute.delete("/blogs/:id",isAuthenticated , Adminonly , deleteBlogs);

// Routes for gallery
mediaContentRoute.post("/gallery",isAuthenticated , Adminonly , upload.single('file'), createGallery);
mediaContentRoute.get("/gallery", getAllGallery);
mediaContentRoute.get("/gallery/:id", getGalleryById);
mediaContentRoute.delete("/gallery/:id",isAuthenticated , Adminonly , deleteGallery);

// mediaContentRoute.use("/preview", express.static(join(__dirname, 'upload')));
// Routes for Blog

export default mediaContentRoute;
