import { resend } from "../lib/resend";
import VerificationEmail from "../../../emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse";



export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> { // ApiResponse is a custom type that has is used to check the type safety of the response
    try {
        await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'Verification email',
            react: VerificationEmail({ username, otp: verifyCode}),
        });
        return {
            success: true,
            message: "Verification email sent",
        };
    } catch (emailError) {
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}