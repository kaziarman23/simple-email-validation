import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

// Router Paths
import HomeRoute from "./src/Routers/Home.Route.js";
import UserRoute from "./src/Routers/User.Route.js";


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", HomeRoute);
app.use("/user", UserRoute);

// Server Listen
app.listen(port, () => {
  console.log(`Backend server is running on Port: ${port}`);
});
