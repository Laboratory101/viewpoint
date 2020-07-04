import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';
import validator from 'validator';

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
        message: 'Invalid Email id'
      }
    })
    public imgUrl?: string;

    @prop({ trim: true, type: mongoose.Schema.Types.String })
    public text?: string;
}

@modelOptions({ schemaOptions: { collection: 'Poll', timestamps: true } })
export class Poll {
    @prop({ required: true, unique: true, trim: true, type: mongoose.Schema.Types.String })
    public title!: string;

    @prop({ trim: true, type: mongoose.Schema.Types.String })
    public description?: string;

    @prop({ type: mongoose.Schema.Types.Number, default: 3 })
    public participantCount?: number;

    @prop({ type: mongoose.Schema.Types.Number, default: 7 })
    public duration?: number;

    @prop({ required: true, enum: PRIVACYTYPE })
    public privacyType!: PRIVACYTYPE;

    @prop({ required: true, enum: DISPLAYTYPE })
    public resultDisplayType!: DISPLAYTYPE;

    @prop({ required: true, trim: true, type: mongoose.Schema.Types.String })
    public author!: string;

    @prop({ required: true, type: Candidate })
    public candidates!: Candidate[];
}

export const PollModel = getModelForClass(Poll);
