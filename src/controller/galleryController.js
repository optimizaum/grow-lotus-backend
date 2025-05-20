import galleryModel from "../model/galleryModel.js";
import deleteUploadedFile from "../utils/deleteUploadedFileUtils.js";


// Function to create a new gallery
export const createGallery = (req, res) => {
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
    message: "Gallery created successfully",
    path: newGallery,
  });
};
 // Function to get All Gallery file 
export const getAllGallery = async (req, res) => {
  try {
    const galleries = await galleryModel.find();
     if(!galleries || galleries.length === 0) {
      return res.status(404).json({ message: "No galleries found" });
    }
    res.status(200).json({
        message: "Galleries fetched successfully",
        galleries,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching galleries", error });
  }
}
// Function to get Gallery file by id
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

// Function to edit Gallery file by id
export const editGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventType } = req.body;
    const galleryData = await galleryModel.findById(id);

    // Update the fields
    galleryData.eventType = eventType || galleryData.eventType;
    galleryData.imageFileName = galleryData.imageFileName || galleryData.imageFileName;

    // If a new file is uploaded, delete the old one and save the new one
    if (req.file) {
      if (galleryData.imageFileName) {
        deleteUploadedFile(galleryData.imageFileName);
      }
      galleryData.imageFileName = req.file.filename;
    }

    await galleryData.save();

    return res.status(200).json({ message: "Service updated successfully", galleryData });
  } catch (error) {
    console.error("Error updating service:", error.message);
    return res.status(500).json({ message: "Error updating service", error: error.message });
  }
};


// DELETE controller
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await galleryModel.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Delete the file from upload folder
    if (gallery.imageFileName) {
      deleteUploadedFile(gallery.imageFileName);
    }

    // Delete the gallery record from DB
    await galleryModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error.message);
    return res.status(500).json({ message: "Error deleting gallery", error: error.message });
  }
};
