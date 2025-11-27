import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  company: string;
  employeeName: string;
  color: string;
  category: string;
  startDate: number;
  endDate: number;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  employeeName: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ITask>("Task", taskSchema);
