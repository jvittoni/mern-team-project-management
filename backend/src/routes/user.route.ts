import { Router } from "express";
import { getCurrentUserController, updateUserController } from "../controllers/user.controller";
import isAuthenticated from "../middleware/isAuthenticated.middleware";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.put("/update", isAuthenticated, updateUserController);

export default userRoutes;