import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { UserModel, User } from '../model/user'
import { errorHandler } from '../utility/errorHandler'
import { MESSAGE } from '../utility/message'

dotenv.config()
mongoose.Promise = global.Promise

export class UserCollection {
  constructor () {
    mongoose.connect(process.env.MONGO_DB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .catch((error: any) => {
        if (error) {
          throw errorHandler(MESSAGE.CONNECTION_FAILED)
        }
      })
  }

  public async getAllUsers (): Promise<User[]> {
    return UserModel.find({})
  }
}
