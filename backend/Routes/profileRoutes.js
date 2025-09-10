import express from "express";
import Farmer from "../models/Farmer.js";
import Farm from "../models/Farm.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch Farmer by firebaseUid
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;
    const farmer = await Farmer.findOne({ firebaseUid });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Fetch Farm(s) linked to the farmer
    const farms = await Farm.find({ farmer: farmer._id });

    // Return combined data
    res.status(200).json({
      message: "Profile retrieved successfully",
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        phone: farmer.phone,
        age: farmer.age,
        language: farmer.language,
        experience: farmer.experience,
        district: farmer.district,
        state: farmer.state,
        village: farmer.village,
        pincode: farmer.pincode,
        createdAt: farmer.createdAt,
        updatedAt: farmer.updatedAt,
      },
      farms, // Array of farms (handles multiple farms if applicable)
    });
  } catch (error) {
    console.error("Error in /profile:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve profile", details: error.message });
  }
});

export default router;
