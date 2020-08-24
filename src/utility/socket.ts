// /* eslint-disable no-useless-constructor */
// /* eslint-disable no-console */
// import io from 'socket.io';
// export class SocketConnection {
//   constructor (private socketIo: io.Server) {
//   }

//   // joinRoom () {
//   //   this.socketIo.on('connect', (socket: any) => {
//   //     console.log('New connection!');
//   //     socket.on('join-room', (room: string) => {
//   //       socket.join(room);
//   //     });
//   //     socket.on('disconnect', () => {
//   //       console.log('Client disconnected');
//   //     });
//   //   });
//   // }

//   broadcastMessage (room: string, data: any) {
//     this.socketIo.in(room).emit('send-message', data);
//   }
// }
