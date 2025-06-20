import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String, // Array of strings for job requirements
      },
    ],

    salary: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      required: true,
    },

    position: {
      type: Number, // e.g., 1 for Junior, 2 for Mid-level, 3 for Senior
      required: true, // e.g., Full-time, Part-time, Internship
    },

    experience: {
      type: Number, // e.g., "1-3 years", "3-5 years"
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to the Company model
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application", // Reference to the Application model
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);
