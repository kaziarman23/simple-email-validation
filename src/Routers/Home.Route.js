import { Router } from "express";
import GetHome from "../Controllers/Home.Controller.js";

const router = Router();

router.get("/", GetHome);

export default router;
