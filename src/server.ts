/* eslint-disable no-console */
import dotenv from 'dotenv';
import io from 'socket.io';
import { createServer } from 'http';
import { ViewPortServer } from './app';
import redis from 'redis';
// import { URL } from 'url';

dotenv.config();
const port = process.env.SERVER_PORT;
const app = new ViewPortServer().app;
const server = createServer(app);
// const redisURL: URL = new URL(process.env.REDISCLOUD_URL as string);
export const websocket: any = io(server);
// export const redisClient = redis.createClient(parseInt(redisURL.port, 10), redisURL.hostname, { no_ready_check: true });

// redisClient.auth(redisURL.password);

export const redisClient = redis.createClient();

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

redisClient.on('connect', () => {
  console.log('Reddis connected');
});

redisClient.on('error', () => {
  console.log('Connection to redis failed');
});

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
