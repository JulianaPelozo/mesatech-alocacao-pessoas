import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  category: string;
  company: string;
  color: string;
  startDate: Date;
  endDate: Date;
  employee: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String },
  color: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  employee: { type: Schema.Types.ObjectId, ref: "Funcionario", required: true }
}, { timestamps: true });

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
