import mongoose, { Schema, Document } from "mongoose"; // document is used to define the type of the document in ts

export interface Message extends Document {
    content: string;
    createdAt: Date;
}
// Schema is used to define the structure of the document
//<message> is coming form above interface jasma content ra createdat ko type defined vako xa

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// user schema 

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,  // trim is used to remove the (white space) vaneko space ho
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;