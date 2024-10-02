import express from "express";
import {
  create,
  deleteCricketerByID,
  getAllCricketers,
  getCricketerByID,
  updateCricketerByID,
} from "../controller/cricketerController.js";

const router = express.Router();

router.post("/", create);
router.get("/", getAllCricketers);
router.get("/:id", getCricketerByID);
router.put("/update/:id", updateCricketerByID);
router.delete("/delete/:id", deleteCricketerByID);

export default router;
