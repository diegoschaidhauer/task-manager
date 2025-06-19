import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura de uma tarefa.
 * @interface ITask
 */
export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate?: Date;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema Mongoose para o modelo Task.
 */
const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO'
  },
  dueDate: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


/**
 * Model Mongoose para a tarefa.
 */
export const Task = mongoose.model<ITask>('Task', TaskSchema);
