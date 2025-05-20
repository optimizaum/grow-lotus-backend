import FAQModel from "../model/FAQModel.js";

// Function to create a new FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    // Create a new FAQ instance
    const newFAQ = await FAQModel.create({
      question,
      answer,
    });

    // Send a success response
    res.status(201).json({ message: "FAQ created successfully", newFAQ });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get all FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQModel.find();

    if (!faqs || faqs.length === 0) {
      return res.status(404).json({ message: "No FAQs found" });
    }

    res.status(200).json({
      message: "FAQs fetched successfully",
      faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get FAQ by ID
export const getFAQById = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQModel.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({
      message: "FAQ fetched successfully",
      faq,
    });

    }catch (error) {
        console.error("Error fetching FAQ:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Function to edit FAQ by ID
export const editFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    // Find the FAQ by ID
    const faq = await FAQModel.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Update the FAQ
    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    await faq.save();

    res.status(200).json({
      message: "FAQ updated successfully",
      faq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete FAQ by ID
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the FAQ by ID
    const faq = await FAQModel.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    // Delete the FAQ
    await FAQModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "FAQ deleted successfully",
    });
    }
    catch (error) {
        console.error("Error deleting FAQ:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
