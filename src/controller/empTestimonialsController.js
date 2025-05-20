import empTestimonialsModel from "../model/empTestimonials.js";

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