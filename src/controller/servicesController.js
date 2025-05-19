import serviceModel from "../model/servicesModel.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import deleteUploadedFile from "../utils/deleteUploadedFileUtils.js";
const __filename = fileURLToPath(import.meta.url);

// Function to create a new service
export const createServices = (req, res) => {
  const { serviceName , description , bulletPoints } = req.body;
  // Check if serviceName || description and file are provided
  if(!serviceName){
    return res.status(400).json({ message: "Service Name required" });
  }
  if(!description ){
    return res.status(400).json({ message: "Service Description required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filename = req.file.filename;
  // Save the file path and other details to the database
  const newServices =  serviceModel.create({
    imageFileName: filename,
    serviceName,
    description,
    bulletPoints
  });

  res.status(200).json({
    message: "Services created successfully",
    path: newServices,
  });
};
 // Function to get file 
export const getServices = async (req, res) => {
  try {
    const services = await serviceModel.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json({
        message: "Services fetched successfully",
        services,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
}

// Function to get file by ID
export const getServicesById = async (req, res) => {
  const { id } = req.params;
  try {
    const services = await serviceModel.findById(id);
    if (!services) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
        message: "Service fetched successfully",
        services,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery", error });
  }
}

// Function to edit file by ID
export const editServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceName , description , bulletPoints } = req.body;
    const servicesData = await serviceModel.findById(id);
    console.log("servicesData", servicesData);
    if (!servicesData) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update the fields
    servicesData.serviceName = serviceName || servicesData.serviceName;
    servicesData.description = description || servicesData.description;
    servicesData.bulletPoints = bulletPoints || servicesData.bulletPoints;
    servicesData.imageFileName = servicesData.imageFileName || servicesData.imageFileName;

    // If a new file is uploaded, delete the old one and save the new one
    if (req.file) {
      if (servicesData.imageFileName) {
        deleteUploadedFile(servicesData.imageFileName);
      }
      servicesData.imageFileName = req.file.filename;
    }

    await servicesData.save();

    return res.status(200).json({ message: "Service updated successfully", servicesData });
  } catch (error) {
    console.error("Error updating service:", error.message);
    return res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

// Function to delete file by ID
export const deleteServices = async (req, res) => {
  const { id } = req.params;

  try {
    const services = await serviceModel.findById(id);
    if (!services) {
      return res.status(404).json({ message: "Services not found" });
    }

    if (services.imageFileName) {
      console.log()
        console.log(`Deleting file =>>: ${services.imageFileName}`);
        deleteUploadedFile(services.imageFileName);
    }

    // Delete the services record from DB
    await serviceModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "services deleted successfully" });
  } catch (error) {
    console.error("Error deleting services:", error.message);
    return res.status(500).json({ message: "Error deleting services", error: error.message });
  }
};


