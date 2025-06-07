import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Something Is Missing" , success: false });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists With This Email", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({ message: "Account Created Successfully", success: true });
        
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
    // Login the user after registration

    export const login = async (req, res) => {
        try {
            const { email, password , role } = req.body;
            if (!email || !password || !role) {
                return res.status(400).json({ message: "Something Is Missing", success: false });
            }

            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid Email Or Password", success: false });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Invalid Email Or Password", success: false });
            }

            // Check if role matches
            if (role !== user.role) {
                return res.status(403).json({ message: "Account Does Not Exists With Current Role", success: false });
            }

            const tokenData = {
               userId:user._id,   
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite:'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
         })
           
        } catch (error) {
            console.error("Error in login:", error);
            return res.status(500).json({ message: "Internal Server Error", success: false });
        }
    };

    // Logout the user

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' }).json({
            message: "Logged Out Successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }


}

// Update user profile

export const updateProfile = async (req, res) => {
    try {
        
const { fullname, email, phoneNumber, bio, skills } = req.body;

const file = req.file; // Assuming you're using multer for file uploads

        // cloudinary upload logic can be added here later

let skillsArray;
if (skills) {
     const skillsArray = skills.split(',');
}

        const userId = req.id; // Assuming userId is set in the request by middleware
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User Not Found", success: false });
        }

        // Update user details

if(fullname) user.fullname = fullname;
if(email) user.email = email;
if(phoneNumber) user.phoneNumber = phoneNumber;
if(bio) user.profile.bio = bio;
if(skills) user.profile.skills = skillsArray;



        

        //resume handling later

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}