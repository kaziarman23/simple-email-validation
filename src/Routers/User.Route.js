import { Router } from "express";
import {
  RegisterUser,
  VerifyEmail,
  GetAllUsers,
  GetOneUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  DeleteAllUser,
} from "../Controllers/User.Controller.js";

const router = Router();

router.post("/register", RegisterUser);

router.post("/verifyEmail", VerifyEmail);

router.get("/", GetAllUsers);

router.get("/:id", GetOneUser);

router.post("/", CreateUser);

router.patch("/:id", UpdateUser);

router.delete("/:id", DeleteUser);

router.delete("/", DeleteAllUser);

export default router;
