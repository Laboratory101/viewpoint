/* eslint-disable no-console */
import io from 'socket.io';
import { app } from '../app';

export class SocketConnection {
  private socketIo: any
  constructor () {
    this.socketIo = io.listen(app);
  }

  joinRoom () {
    this.socketIo.on('connect', (socket: any) => {
      socket.on('join-room', (room: string) => {
        socket.join(room);
      });
    });
  }

  broadcastMessage (room: string, data: any) {
    this.socketIo.in(room).emit('send-message', data);
  }
}
