import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';
import validator from 'validator';
import { ERROR_MESSAGE } from '../utility/message';

enum PRIVACYTYPE {
  OPEN,
  SECURED
}

enum DISPLAYTYPE {
  ENDOFPOLL,
  REALTIME
}

class Candidate {
  @prop({
    trim: true,
    type: mongoose.Schema.Types.String,
    validate: {
      validator: value => validator.isURL(value, { protocols: ['http', 'https'] }),
      message: ERROR_MESSAGE.IMAGE_UPLOAD_ERROR.message
    }
  })
  public imgUrl?: string;

  @prop({ trim: true, type: mongoose.Schema.Types.String })
  public text?: string;

  @prop({ type: mongoose.Schema.Types.Number, default: 0 })
  public count?: number
}

@modelOptions({ schemaOptions: { collection: 'Poll', timestamps: true } })
export class Poll {
  @prop({ required: true, trim: true, type: mongoose.Schema.Types.String })
  public title!: string;

  @prop({ trim: true, type: mongoose.Schema.Types.String })
  public description?: string;

  @prop({ type: mongoose.Schema.Types.Number, default: 3 })
  public participantCount?: number;

  @prop({ type: mongoose.Schema.Types.Number, default: 7 })
  public duration?: number;

  @prop({ required: true, enum: PRIVACYTYPE })
  public privacyType!: PRIVACYTYPE;

  @prop({ trim: true, type: mongoose.Schema.Types.String, unique: true, minlength: 10 })
  public pin?: string

  @prop({ required: true, enum: DISPLAYTYPE })
  public resultDisplayType!: DISPLAYTYPE;

  @prop({ required: true, trim: true, type: mongoose.Schema.Types.String })
  public author!: string;

  @prop({ required: true, type: Candidate })
  public candidates!: Candidate[];
}

export const PollModel = getModelForClass(Poll);
