import { z } from "zod";


// yesma hami ley only username check garna ko lagi banako ho
export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 2 characters")
    .max(20, "Username must be atmost 20 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username must contain only alphanumeric characters and underscores");

// yesma hami ley vai varko data jun signup garda aunxa tio check garna lageko 
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" })
})






























































