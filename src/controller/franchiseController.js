import FranchiseModel from "../model/franchiseModel.js";
import deleteUploadedFile from "../utils/deleteUploadedFileUtils.js";

// Function to create a new franchise
export const createFranchise = async (req, res) => {
  try {
    const { title, location, googleMapLink, description } = req.body;

    if ( !title || !location || !googleMapLink || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageFileName = req.file.filename;

    // Create a new franchise instance
    const newFranchise = await FranchiseModel.create({
      imageFileName,
      title,
      location,
      googleMapLink,
      description,
    });

    // Send a success response
    res.status(201).json({ message: "Franchise created successfully", newFranchise });
  } catch (error) {
    console.error("Error creating franchise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get all franchises
export const getAllFranchises = async (req, res) => {
  try {
    const franchises = await FranchiseModel.find();
    if (!franchises || franchises.length === 0) {
      return res.status(404).json({ message: "No franchises found" });
    }
    res.status(200).json({ message: "Franchises fetched successfully", franchises });
  } catch (error) {
    console.error("Error fetching franchises:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get a franchise by ID
export const getFranchiseById = async (req, res) => {
  try {
    const { id } = req.params;
    const franchise = await FranchiseModel.findById(id);
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    res.status(200).json({ message: "Franchise fetched successfully", franchise });
    }
    catch (error) {
    console.error("Error fetching franchise:", error);
    res.status(500).json({ message: "Internal server error" });
    }
}
// Function to edit a franchise by ID
export const editFranchise = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, googleMapLink, description } = req.body;

    // Find the franchise by ID
    const franchise = await FranchiseModel.findById(id);
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    // Update the fields
    franchise.title = title || franchise.title;
    franchise.location = location || franchise.location;
    franchise.googleMapLink = googleMapLink || franchise.googleMapLink;
    franchise.description = description || franchise.description;
    // If a new file is uploaded, delete the old one and save the new one
    if (req.file) {
      if (franchise.imageFileName) {
        await  deleteUploadedFile(franchise.imageFileName);
      }
      franchise.imageFileName = req.file.filename;
    }
    await franchise.save();
    res.status(200).json({ message: "Franchise updated successfully", franchise });
    }
    catch (error) {
    console.error("Error updating franchise:", error);
    res.status(500).json({ message: "Internal server error" });
    }
}
// Function to delete a franchise by ID
export const deleteFranchise = async (req, res) => {
  try {
    const { id } = req.params;
    const franchise = await FranchiseModel.findById(id);
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    // Delete the file from upload folder
    if (franchise.imageFileName) {
        deleteUploadedFile(franchise.imageFileName);
    }
    // Delete the franchise record from DB
    await FranchiseModel.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Franchise deleted successfully" });
    }catch (error) {
    console.error("Error deleting franchise:", error);
    res.status(500).json({ message: "Internal server error" });
    }
}