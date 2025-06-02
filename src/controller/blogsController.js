import blogModel from "../model/blogModel.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import fs from 'fs';
import deleteUploadedFile from "../utils/deleteUploadedFileUtils.js";




// Function to create a new blog
export const createBlogs = async (req, res) => {
  const { title , description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title are required" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filename = req.file.filename;
  // Save the file path and other details to the database
  const newBlog = await blogModel.create({
    imageFileName: filename,
    title,
    description
  });

  res.status(200).json({
    message: "Blog created successfully",
    path: newBlog,
  });
};
 // Function to get All Blogs file 
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json({
        message: "All blogs",
        data: blogs
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
}
// Function to get Gallery file by id
export const getBlogsById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blogModel.findById(id);
    if (!blogs) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json({
        message: "blog fetched successfully",
        data: blogs
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
}

export const editBlogs = async (req, res) => {
    try {
        const { id } = req.params;
        const { title , description } = req.body;

        // Check if the blog exists
        const blogData = await blogModel.findById(id);
        if (!blogData) {
            return res.status(404).json({ message: "Blog not found" });
        }
        console.log("my blog================================> " , blogData);
        

        // Update the blog details
         blogData.title = title || blogData.title;
         blogData.description = description || blogData.description;
         blogData.imageFileName = blogData.imageFileName || blogData.imageFileName;
        
        // If a new file is uploaded, delete the old one and save the new one
        if (req.file) {
            deleteUploadedFile(blogData.imageFileName);
            blogData.imageFileName = req.file.filename;
        }

        await blogData.save();

        res.status(200).json({ message: "Blog updated successfully", data: blogData });
        
    } catch (error) {
        console.error("Error in editBlogs:", error);
        res.status(500).json({ message: "Error editing blog", error });
    }
}


// Function to edit Edit Blog file by id
export const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { description , title} = req.body;
    const blogData = await blogModel.findById(id);

    // Update the fields
    blogData.title = title || blogData.title;
    blogData.description = description || blogData.description;
    blogData.imageFileName = blogData.imageFileName || blogData.imageFileName;

    // If a new file is uploaded, delete the old one and save the new one
    if (req.file) {
      if (blogData.imageFileName) {
        deleteUploadedFile(blogData.imageFileName);
      }
      blogData.imageFileName = req.file.filename;
    }

    await blogData.save();

    return res.status(200).json({ message: "blog updated successfully", blogData });
  } catch (error) {
    console.error("Error updating service:", error.message);
    return res.status(500).json({ message: "Error updating service", error: error.message });
  }
};


// DELETE controller
export const deleteBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    // Delete the file from upload folder
    if (blog.imageFileName) {
      deleteUploadedFile(blog.imageFileName);
    }

    // Delete the gallery record from DB
    await blogModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    return res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};