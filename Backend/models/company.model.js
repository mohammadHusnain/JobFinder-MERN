import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure company names are unique
      sparse: true // Allows multiple null values while maintaining uniqueness for actual values

    },

    description: {
      type: String,
    }, 

    website: {
      type: String, // URL to the company's website
    },

    location: {
        type: String, // Location of the company
    },

    logo: {
      type: String, // URL to the company logo
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (Recruiter)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export const Company = mongoose.model("Company", companySchema);  