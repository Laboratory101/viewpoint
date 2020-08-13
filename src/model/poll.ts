import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';
import validator from 'validator';
import { ERROR_MESSAGE, INFO_MESSAGE } from '../utility/message';

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

  @prop({ type: mongoose.Schema.Types.Number, default: 0, min: [0, INFO_MESSAGE.MIN_VOTE.message] })
  public count?: number

  @prop({ required: true, unique: true })
  public candidateId!: string
}

@modelOptions({ schemaOptions: { collection: 'Poll', timestamps: true } })
export class Poll {
  @prop({ required: true, unique: true })
  public pollId!: string

  @prop({ required: [true, INFO_MESSAGE.TITLE_REQUIRED.message], trim: true, type: mongoose.Schema.Types.String })
  public title!: string;

  @prop({ trim: true, type: mongoose.Schema.Types.String })
  public description?: string;

  @prop({ type: mongoose.Schema.Types.Number, default: 3, min: [3, INFO_MESSAGE.MIN_PARTICIPANT_COUNT.message] })
  public participantCount?: number;

  @prop({ type: mongoose.Schema.Types.Number, default: 7, max: [30, INFO_MESSAGE.MAX_DURATION.message] })
  public duration?: number;

  @prop({ required: [true, INFO_MESSAGE.PRIVACY_TYPE_REQUIRED.message], enum: PRIVACYTYPE })
  public privacyType!: PRIVACYTYPE;

  @prop({ trim: true, type: mongoose.Schema.Types.String, minlength: 10 })
  public pin?: string

  @prop({ required: [true, INFO_MESSAGE.RESULT_DISPLAY_TYPE.message], enum: DISPLAYTYPE })
  public resultDisplayType!: DISPLAYTYPE;

  @prop({ trim: true, type: mongoose.Schema.Types.String, default: 'Anonymous' })
  public author?: string;

  @prop({ required: [true, INFO_MESSAGE.HOST_REQUIRED.message], trim: true, type: mongoose.Schema.Types.String })
  public host!: string;

  @prop({
    required: [true, INFO_MESSAGE.CANDIDATES_REQUIRED.message],
    _id: false,
    type: Candidate,
    validate: {
      validator: candaidates => (Array.isArray(candaidates) && candaidates.length > 1),
      message: INFO_MESSAGE.MIN_CANDIDATES.message
    }
  })
  public candidates!: Candidate[];
}

export const PollModel = getModelForClass(Poll);
