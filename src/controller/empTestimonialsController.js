import empTestimonialsModel from "../model/empTestimonialsModel.js";
import deleteUploadedFile from "../utils/deleteUploadedFileUtils.js";

// Function to create a new employee testimonial

export const empTestimonials = async (req, res) => {
  try {
    const {description, designation } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description required" });
    }
    // Check if the request contains a file
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    // Get the file name from the request
    const imageFileName = req.file.filename;

    // Create a new testimonial instance
    const newTestimonial = new empTestimonialsModel({
      imageFileName,
      description,
      designation,
    });

    // Save the testimonial to the database
    await newTestimonial.save();

    // Send a success response
    res.status(201).json({ message: "Employee testimonial created successfully" });
  } catch (error) {
    console.error("Error creating employee testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function for get All Employee
export const getAllEmpTestimonials = async (req, res) => {
  try {
    const testimonials = await empTestimonialsModel.find();

    if(!testimonials || testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    res.status(200).json({ 
        message: "Employee testimonials fetched successfully",
        testimonials,
     });
  } catch (error) {
    console.error("Error fetching employee testimonials:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete an employee testimonial
export const deleteEmpTestimonials = async (req, res) => {
    try {
    const { id } = req.params;

    const employeeData = await empTestimonialsModel.findById(id);
    if (!employeeData) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete the file from upload folder
    if (employeeData.imageFileName) {
      deleteUploadedFile(employeeData.imageFileName);
    }

    // Delete the Employee record from DB
    await empTestimonialsModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting Employee:", error.message);
    return res.status(500).json({ message: "Error deleting Employee", error: error.message });
  }
};