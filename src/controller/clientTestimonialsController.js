import clientTestimonialsModel from '../model/clientTestimonialsModel.js';

// Function to create a new client testimonial

export const clientTestimonials = async (req , res)=>{
    const {clientName, title , description } = req.body;
    
    if(!clientName || !title || !description){
        return res.status(400).json({ message: "Title and description are required" });
    }


  // Save the file path and other details to the database
  const newClientTestimonialsModel = await clientTestimonialsModel.create({
    clientName,
    title,
    description
  });
  res.status(200).json({
    message: "Client Testimonials created successfully",
    path: newClientTestimonialsModel,
  });
}

// Function to get All Client Testimonialss
export const getAllClientTestimonials = async (req, res) => {
  try {
    const clientTestimonials = await clientTestimonialsModel.find();
     if(!clientTestimonials || clientTestimonials.length === 0) {
      return res.status(404).json({ message: "No Client Testimonials found" });
    }
    res.status(200).json({
        message: "Client Testimonials fetched successfully",
        clientTestimonials,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Client Testimonials", error });
  }
}

// Function to get Client Testimonials by id
export const getClientTestimonialsById = async (req, res) => {
    try {
    const { id } = req.params;
    const clientTestimonials = await clientTestimonialsModel.findById(id);
    if (!clientTestimonials) {
      return res.status(404).json({ message: "Client Testimonials not found" });
    }
    res.status(200).json({
        message: "Client Testimonials fetched successfully",
        clientTestimonials,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Client Testimonials", error });
  }
}

// Function to edit Client Testimonials by id
export const editClientTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if the testimonial exists
    const clientTestimonials = await clientTestimonialsModel.findById(id);
    
    if (!clientTestimonials) {
      return res.status(404).json({ message: "Client Testimonials not found" });
    }

    // Update the testimonial
    clientTestimonials.title = title || clientTestimonials.title;
    clientTestimonials.description = description || clientTestimonials.description;

    await clientTestimonials.save();

    res.status(200).json({
      message: "Client Testimonials updated successfully",
      clientTestimonials,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating Client Testimonials", error });
  }
}

// Function to delete Client Testimonials by id
export const deleteClientTestimonials = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the testimonial exists
    const clientTestimonials = await clientTestimonialsModel.findById(id);
    if (!clientTestimonials) {
      return res.status(404).json({ message: "Client Testimonials not found" });
    }

    // Delete the testimonial
    await clientTestimonialsModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Client Testimonials deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Client Testimonials", error });
  }
}