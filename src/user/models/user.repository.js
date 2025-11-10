import UserModel from "./user.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export const createNewUserRepo = async (user) => {
  return await new UserModel(user).save();
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

export const findUser = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
  await user.getResetPasswordToken();

  await user.save();
  return { user: user, token: user.resetPasswordToken };
};

export const findUserForPasswordResetRepo = async (hashtoken) => {
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

export const updateUserProfileRepo = async (_id, data) => {
  const user = await UserModel.findOneAndUpdate({ _id }, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return false;
  }
  return user;
};

export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {
  const user = await UserModel.findOneAndUpdate({ _id }, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return false;
  }
  return user;
};
