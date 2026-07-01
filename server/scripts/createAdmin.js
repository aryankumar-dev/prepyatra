import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "#config/db.js";
import { User } from "#models/user.models.js";

dotenv.config();

const EMAIL = process.argv[2];
const TEMP_PASSWORD = process.argv[3] || "ChangeMe123!";

if (!EMAIL) {
    console.error("Usage: node scripts/createAdmin.js <email> [tempPassword]");
    process.exit(1);
}

async function run() {
    await connectDB();

    let user = await User.findOne({ email: EMAIL });
    if (user) {
        user.role = "admin";
        await user.save();
        console.log(`Promoted existing user ${EMAIL} to admin.`);
    } else {
        const username = EMAIL.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
        user = await User.create({
            email: EMAIL,
            username,
            password: TEMP_PASSWORD,
            fullName: "Admin",
            role: "admin",
        });
        console.log(`Created new admin user ${EMAIL} with username "${username}" and temp password "${TEMP_PASSWORD}". Log in and change the password.`);
    }

    await mongoose.connection.close();
}

run().catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
});
