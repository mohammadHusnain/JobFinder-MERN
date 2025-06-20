import { Company } from "../models/company.model.js";
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudinary.js'

export const registerCompany = async (req, res) => {

    try {
        
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required" , success: false});
        }

    let company = await Company.findOne({ name : companyName });
    if (company) {
        return res.status(400).json({ message: "Company already exists, register Company With Different Name", success: false });
    }

    company = await Company.create({
        name: companyName,
        userId: req.id,
    });

    return res.status(201).json({ message: "Company registered successfully", company, success: true });

    } catch (error) {
        res.status(500).json({ message: "Error registering company", error: error.message });
    }

}

// Function to get company details

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // logged-in user's ID
        const companies = await Company.find({ userId});
        if(!companies){
            return res.status(404).json({ message: "No companies found for this user", success: false });
        }
        return res.status(200).json({ companies, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching companies", error: error.message, success: false });
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const  companyId  = req.params.id; // Extract company ID from request parameters
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        }
        return res.status(200).json({ company, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching company", error: error.message, success: false });
    }   
}

// Function to update company details
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; // Assuming you're using multer for file uploads

        //cloudinary comes here

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url


        const updateData = {name, description, website, location , logo}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if(!company){
           return res.status(404).json({ message: "Company not found", success: false });
        }

        return res.status(200).json({ message: "Company Info updated successfully", company, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Error updating company", error: error.message, success: false });
    }
}