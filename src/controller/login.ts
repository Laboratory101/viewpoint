import express, { Request, Response } from 'express'
// import bcrypt from 'bcrypt'

export const loginController = express.Router()

loginController.get('/signup', (_req: Request, res: Response) => {
  // const encryptedPassword: string = bcrypt.hashSync(req.body.password, 10)
  res.send('Signedup')
})
