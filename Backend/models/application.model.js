import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference to the Job model
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (Job Seeker)
      required: true,
    },
    
    status: {
      type: String,
      enum: [ "Pending", "Accepted", "Rejected"],
      default: "Pending", // Default status of the application
    },
   
},
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export const Application = mongoose.model("Application", applicationSchema);