const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =======================
// CREATE USER (SIGN UP)
// =======================
router.post("/", async (req, res) => {
  try {
    // ensure required fields
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      email: req.body.email.toLowerCase(),
      role: req.body.role || "editor",
      password: hashed,
    });

    await user.save();

    // return created user (without password)
    const created = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// =======================
// LOGIN (FIXED PROPER WAY)
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.role === "viewer") {
      return res.status(403).json({ message: "Viewer accounts cannot sign in. Please use public pages." });
    }

    return res.json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// UPDATE USER
// =======================
router.put("/:id", async (req, res) => {
  try {
    const update = { ...req.body };

    // if password is provided, hash it
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const formatted = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };

    res.json(formatted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// =======================
// DELETE USER
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// GET USERS (NO PASSWORDS)
// =======================
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    const formatted = users.map((u) => ({
      id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      username: u.username,
      role: u.role || u.type,
      isActive: u.isActive,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;