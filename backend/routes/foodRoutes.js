import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import upload from "../middleware/multer.js";

const foodRouter = express.Router();

// add gfood with image
foodRouter.post("/add", upload.single("image"), addFood);

// list food
foodRouter.get("/list", listFood);

// remove food
foodRouter.post("/remove", removeFood);

export default foodRouter;