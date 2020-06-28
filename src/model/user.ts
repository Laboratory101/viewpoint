import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { isEmail } from '../utility/validators';

@modelOptions({ schemaOptions: { collection: 'Users' } })
export class User {
    @prop({ required: true, trim: true })
    public userName?: string;

    @prop({ required: true, trim: true })
    public password?: string;

    @prop({
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: val => isEmail(val),
        message: 'Invalid Email id'
      }
    })
    public emailId?: string;
}

export const UserModel = getModelForClass(User);
