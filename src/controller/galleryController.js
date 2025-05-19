import galleryModel from "../model/galleryModel.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import fs from 'fs';
export const uploadGallery = (req, res) => {
  const { eventType } = req.body;
  // Check if eventType and actions are provided
  if(!eventType ){
    return res.status(400).json({ message: "Event type are required" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filename = req.file.filename;
  // Save the file path and other details to the database
  const newGallery =  galleryModel.create({
    imageFileName: filename,
    eventType
  });

  res.status(200).json({
    message: "File uploaded successfully",
    path: newGallery,
  });
};
 // Function to get file 
export const getGallery = async (req, res) => {
  try {
    const galleries = await galleryModel.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching galleries", error });
  }
}

export const getGalleryById = async (req, res) => {
  const { id } = req.params;
  try {
    const gallery = await galleryModel.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery", error });
  }
}

// DELETE controller
export const deleteGallery = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Find the gallery by ID
    const gallery = await galleryModel.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // 2. Delete the file from upload folder
    if (gallery.imageFileName) {
      deleteUploadedFile(gallery.imageFileName);
    }

    // 3. Delete the gallery record from DB
    await galleryModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error.message);
    return res.status(500).json({ message: "Error deleting gallery", error: error.message });
  }
};

// Utility function
const deleteUploadedFile = (filename) => {
  const filePath = join(process.cwd(), 'src/upload', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file '${filename}':`, err.message);
    } else {
      console.log(`File '${filename}' deleted from upload folder.`);
    }
  });
};
