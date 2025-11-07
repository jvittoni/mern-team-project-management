import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { getCurrentUserService } from "../services/user.service";
import UserModel from "../models/user.model";
import { hashValue } from "../utils/bcrypt";

export const getCurrentUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const { user } = await getCurrentUserService(userId);

        return res.status(HTTPSTATUS.OK).json({
            message: "User fetch successfully",
            user,
        });
    }
);

export const updateUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { name, email, profilePicture, password } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(HTTPSTATUS.NOT_FOUND).json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (profilePicture) user.profilePicture = profilePicture;
  if (password) user.password = password;

  await user.save(); 

  return res.status(HTTPSTATUS.OK).json({
    message: "Profile updated successfully",
    user: user.omitPassword(),
  });
});

