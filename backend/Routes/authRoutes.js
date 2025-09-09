import authController from '../Controllers/authController.js';
import express from "express";

const router = express.Router();

router.post("/login", authController);
router.post("/register", authController);

export default router;
