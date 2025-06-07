import {Application} from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJob = async(req , res)=>{
try {
    const userId = req.id;
    const jobId = req.params.id; // Extract job ID from request parameters

    if( !jobId) {
        return res.status(400).json({ message: " Job ID is required", success: false });
    }

// check if the user has alr applied for job

const existingApplication = await Application.findOne({ applicant: userId, job: jobId });

if(existingApplication){
    return res.status(400).json({ message: "You have already applied for this job", success: false });
}

// check if the job exists
const job = await Job.findById(jobId);
if(!job){
    return res.status(404).json({ message: "Job not found", success: false });
}

// create a new application

const newApplication = await Application.create({
    applicant: userId,
    job: jobId,
});

job.applications.push(newApplication._id);
await job.save();
return res.status(201).json({ 
    message: "Application submitted successfully", 
    application: newApplication, 
    success: true 
});

} catch (error) {
    console.log(error);
    return res.status(500).json({ 
        message: "Error applying for job", 
        error: error.message, 
        success: false 
    });
    
}
}

// getting applied jobs by user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id; // Get the logged-in user's ID

        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }) // Sort by most recent applications
            .populate({path:'job' , options:{sort:{createdAt:-1}} , populate: { path: 'company', options:{sort:{createdAt:-1}} }
             }) 
            

        if (!application) {
            return res.status(404).json({ message: "No applications found", success: false });
        }

        return res.status(200).json({ application, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching applied jobs", error: error.message, success: false });
    }
};

// get Applicants , how much users have applied for a job

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id; // Extract job ID from request parameters

        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate: {
                  path: 'applicant', // Populate the applicant field
        }
    })

    if(!job){
        return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });

} catch (error) {
        return res.status(500).json({ message: "Error fetching applicants", error: error.message, success: false });
    }
}


// update status of candidate

export const updateStatus = async (req,res)=>{
    try {
        const {status} = req.body
        const applicationId = req.params.id

if(!status){
            return res.status(400).json({ message: "Status Is Required", success: false });

}

// find the application by applicant id

const application = await Application.findOne({_id:applicationId})

if(!application){
            return res.status(404).json({ message: "Application not found", success: false });

}

// update status

application.status = status.toLowerCase()
await application.save();

return res.status(200).json({ message: "Status Updated Successfully", success: true });


    } catch (error) {
        console.log(error);
        
    }
}