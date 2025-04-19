const express = require("express");
const router = express.Router();
const { calculateEntropy } = require("../utils/entropy");
const { estimateCrackTime } = require("../utils/crack_time");
const fs = require("fs");
const path = require("path");
// const pickle = require("picklejs");
const { spawn } = require("child_process");

// ========== /api/analyze ==========
router.post("/analyze", (req, res) => {
    const { password } = req.body;

    if (!password) return res.status(400).json({ error: "Password is required" });

    const entropy = calculateEntropy(password);
    const crackTime = estimateCrackTime(entropy);

    console.log(`Password: ${password}`);
    console.log(`Entropy: ${entropy}`);
    console.log(`Estimated Crack Time: ${crackTime}`);

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let strength = "Weak";
    if (score >= 4) strength = "Strong";
    else if (score >= 2) strength = "Medium";

    res.json({ entropy, crackTime, strength });
});


// ========== /api/ai ==========
// router.post("/ai", async (req, res) => {
//     const { password } = req.body;
//     if (!password) return res.status(400).json({ error: "Password is required" });

//     // Extract simple features (same as model training)
//     const features = [
//         password.length,
//         [...password].filter(c => /[a-z]/.test(c)).length,
//         [...password].filter(c => /[A-Z]/.test(c)).length,
//         [...password].filter(c => /[0-9]/.test(c)).length,
//         [...password].filter(c => /[^a-zA-Z0-9]/.test(c)).length
//     ];

//     try {
//         // Spawn a Python process to run prediction
//         const py = spawn("python3", ["./ai_model/predict.py", ...features.map(String)]);

//         let result = "";
//         py.stdout.on("data", (data) => {
//             result += data.toString();
//         });

//         py.stderr.on("data", (data) => {
//             console.error("Error:", data.toString());
//         });

//         py.on("close", () => {
//             res.json({ prediction: result.trim() });
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "AI prediction failed" });
//     }
// });

module.exports = router;
