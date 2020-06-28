import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { loginController } from './controller/login';
import { UserCollection } from './service/user.collection';

// initialize configuration
dotenv.config();

const app: express.Application = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json())
app.use('/', loginController);
app.use('/test', (_req: any, res: any) => {
  const users: UserCollection = new UserCollection();
  users.getAllUsers().then(data => res.status(200).send(data));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
