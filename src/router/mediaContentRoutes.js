import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { deleteGallery, getAllGallery, getGalleryById, createGallery, editGallery } from '../controller/galleryController.js';
import { createServices, deleteServices, editServices, getServices, getServicesById } from '../controller/servicesController.js';
import { createBlogs, deleteBlogs, editBlog, editBlogs, getAllBlogs, getBlogsById } from '../controller/blogsController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import Adminonly from '../middleware/AdminOnly.js';
import { upload } from '../utils/setupMulter.js';

const mediaContentRoute = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Image file preview Route
mediaContentRoute.get('/preview/:filename', (req , res) => {
  res.sendFile(join(__dirname, '../utils/upload', req.params.filename));
});

// Route for Services
// mediaContentRoute.post("/services",isAuthenticated , Adminonly , upload.single('file'), createServices);
mediaContentRoute.post("/services", upload.single('file'), createServices);
mediaContentRoute.get("/services", getServices);
mediaContentRoute.get("/services/:id", getServicesById);
mediaContentRoute.patch("/services/:id",isAuthenticated , Adminonly , upload.single('file') , editServices);
mediaContentRoute.delete("/services/:id",isAuthenticated , Adminonly , deleteServices);

// Route for Blogs
mediaContentRoute.post("/blogs",isAuthenticated , Adminonly , upload.single('file'), createBlogs);
mediaContentRoute.get("/blogs", getAllBlogs);
mediaContentRoute.get("/blogs/:id", getBlogsById);
mediaContentRoute.patch("/blogs/:id",isAuthenticated , Adminonly , editBlogs);
mediaContentRoute.post("/blogs", isAuthenticated , Adminonly , upload.single('file'), editBlog);
mediaContentRoute.delete("/blogs/:id",isAuthenticated , Adminonly , deleteBlogs);

// Routes for gallery
mediaContentRoute.post("/gallery",isAuthenticated , Adminonly , upload.single('file'), createGallery);
mediaContentRoute.get("/gallery", getAllGallery);
mediaContentRoute.get("/gallery/:id", getGalleryById);
mediaContentRoute.patch("/gallery/:id",isAuthenticated , Adminonly , upload.single('file') , editGallery);
mediaContentRoute.delete("/gallery/:id",isAuthenticated , Adminonly , deleteGallery);

// mediaContentRoute.use("/preview", express.static(join(__dirname, 'upload')));
// Routes for Blog

export default mediaContentRoute;
