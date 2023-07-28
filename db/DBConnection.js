import mongoose from "mongoose";

// ==================================================================

export const DBConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB1, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connected...");
    } catch (error) {
        console.log("error database disconnected...", error);
    }
}