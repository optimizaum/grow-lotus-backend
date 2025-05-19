import EnquiryModel from "../model/enquiryModel.js";

export const enquiry = async (req, res , next) => {
    try {
        const { name, phone , serviceType } = req.body;
    
        if (!name || !phone) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }
    
        const newEnquiry = await EnquiryModel.create({
        name,
        phone,
        serviceType
        });
    
        res.status(201).json({
        success: true,
        message: "Enquiry submitted successfully",
        data: newEnquiry,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
         next(error);
    }
}