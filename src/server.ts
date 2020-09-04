/* eslint-disable no-console */
import dotenv from 'dotenv';
import io from 'socket.io';
import { createServer } from 'http';
import { ViewPortServer } from './app';

dotenv.config();
const port = process.env.SERVER_PORT;
const app = new ViewPortServer().app;
const server = createServer(app);
export const websocket: any = io(server);

websocket.on('connect', (socket: any) => {
  console.log('Connected client on port %s', port);

  socket.on('join-room', (room: string) => {
    socket.join(room);
    console.log('Joined room!');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
