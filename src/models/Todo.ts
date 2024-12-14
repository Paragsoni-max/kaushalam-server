import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "high"], default: "low" },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
