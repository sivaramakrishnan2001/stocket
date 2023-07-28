import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation"
        },
        content: Object,
    },
    {
        timestamps: true, suppressReservedWarning: true, suppressReservedKeysWarning: true
    }
);

export const Message = mongoose.model("Message", messageSchema);