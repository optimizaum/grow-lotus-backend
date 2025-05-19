import contactUsModel from "../model/contactUsModel.js";


// This function handles the addition of contact information to the database
export const addContactUsInfo = async (req, res, next) => {
    try {
        const { email, address, phone } = req.body;
    
        if (!email || !address || !phone) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }
        // Check if the email is already registered
        const existingContact = await contactUsModel.findOne({ email });

        if (existingContact) {
        // delete existing contact
        await contactUsModel.findOneAndDelete({ email }); 
        }
        
        const newContactUsInfo = await contactUsModel.create({
        email,
        address,
        phone,
        });
    
        res.status(201).json({
        success: true,
        message: "Contact Us information added successfully",
        data: newContactUsInfo,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        next(error);
    }
}

// This function retrieves all contact information from the database
export const getContactUsInfo = async (req, res) => {
    try {
        const contactInfo = await contactUsModel.find();
        if (!contactInfo || contactInfo.length === 0) {
            return res.status(404).json({ message: "No contact information found" });
        }
        res.status(200).json({
            message: "Contact Us information fetched successfully",
            data: contactInfo
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact information", error });
    }
}