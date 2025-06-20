import { Job } from "../models/job.model.js";

// job posting function by admin or company

export const postJob = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            requirements, 
            location, 
            salary, 
            jobType, 
            experience,  // Keep this (matches Postman's updated field)
            position, 
            companyId 
        } = req.body;

        const userId = req.id;

        console.log(req.body); // Log the request body for debugging
        
        // Validation (unchanged, but now checks for experienceLevel)
        if (!title || !description || !requirements || !location || 
            !salary || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Create job (map Postman's data directly)
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary.replace(/[^0-9]/g, "")), // Handles "$2000/month" → 2000
            location,
            jobType,
            experience,  // No renaming needed (Postman sends experienceLevel)
            position,
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({ 
            message: "Job posted successfully", 
            job, 
            success: true 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Job posting failed", 
            error: error.message, 
            success: false 
        });
    }
};

// Function to get all jobs with optional keyword search

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }, // Case-insensitive search
                { description: { $regex: keyword, $options: "i" } }, // Case-insensitive search
            ]
        };

       const jobs = await Job.find(query).populate({
        path:"company"
       }).sort({createdAt:-1})

       if (!jobs ) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ jobs, success: true });

    } catch (error) {
        // Handle error appropriately
        return res.status(500).json({ message: "Error fetching jobs", error: error.message, success: false });
    }
}

// get job by id for job seeker

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id; // Extract job ID from request parameters
        const job = await Job.findById(jobId).populate("company", "name" ) // Populate company name
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ job, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching job", error: error.message, success: false });
    }
}

// how many jobs have admin or company posted
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}