import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !description || !price || !category || !image) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image,
    });

    await food.save();

    res.json({
      success: true,
      message: "Food added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error adding food",
    });
  }
};

// List food
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching food",
    });
  }
};

// Remove food
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // Delete image safely
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Error deleting image:", err);
    });

    // Delete document
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error removing food",
    });
  }
};