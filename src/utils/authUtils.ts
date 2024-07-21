import jwt from "jsonwebtoken";
import { JwtTokenPayload } from "../model/jwtTokenPayload.mode";
require("dotenv").config();

export const generateToken = (payload: JwtTokenPayload) => {
  if (process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });
  }
};

export const generateRefreshToken = (payload: JwtTokenPayload) => {
  if (process.env.REFRESH_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  }
};

export const verifyToken = (token: string) => {
  if (process.env.ACCESS_TOKEN_SECRET) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return null;
    }
  }
};

export const verifyRefreshToken = (token: string) => {
  if (process.env.REFRESH_TOKEN_SECRET) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return null;
    }
  }
};
