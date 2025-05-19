import userModel from "../model/userModel.js";
import { generateToken } from "../utils/jwtTokenGenerate.js";
export const registerUser = async (req, res) => {
  // this function has to run for the first time when creating new admin
  try {
    const { name, email, password } = req.body;

     if (!email , !name , !password ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:"Email already registered"
      });
    }
    const user = await userModel.create({
        name,
        email,
        password
    })

    res.status(201).json({
      success: true,
      message: "admin register successfully",
      email: email,
    });
     }catch (error) {
     console.error("Error in registerUser:", error);
     }
}

// Login function
export const login = async (req , res)=>{
    try {
        const { email, password } = req.body;
         if (!email , !password ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
            }
        
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT token
         const token =  generateToken(user);
        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        // proceed with token generation or session
        res.status(200).json({ message: "Login successful" , token});

    } catch (error) {
        console.log(error.message)
    }
}

export const logout = async (req , res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error.message)
    }
}