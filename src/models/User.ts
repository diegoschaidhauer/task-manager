import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura de um usuário.
 * @interface IUser
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema Mongoose para o modelo User.
 */
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, { timestamps: true });



/**
 * Model Mongoose para o usuário.
 */
export const User = mongoose.model<IUser>('User', UserSchema);
