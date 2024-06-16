import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail"; // resend is used to send emails inside this function

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { email, username, password } = await req.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true

        })

        if (existingUserVerifiedByUsername) {
            return {
                status: 400,
                body: {
                    success: false,
                    message: "Username already taken",
                },
            };
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({
            email,
            isVerified: true
        })

        if (existingUserVerifiedByEmail) {
            return {
                status: 400,
                body: {
                    success: false,
                    message: "Email already taken",
                },
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);

            const newUser = await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expireDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            });
            await newUser.save();

            // send verification email 
            await sendVerificationEmail(email, username, verifyCode);

            return {
                status: 200,
                body: {
                    success: true,
                    message: "User created successfully",
                },
            };
        }

    } catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                message: "Internal server error",
            },
        };
    }
}