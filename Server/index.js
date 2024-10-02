import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectToDB from "./config/connectToDB.js";
import router from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

connectToDB();

app.use("/api/cricketers", router);
app.listen(PORT, (req, res) => {
  console.log(`########Server Running On Port ${PORT} ###############`);
});
