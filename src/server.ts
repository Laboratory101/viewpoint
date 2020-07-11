import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const http = require('http').Server(app);
const port = process.env.SERVER_PORT;

http.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
