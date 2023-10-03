

import { Server } from 'socket.io'
// import { withIronSessionApiRoute } from "iron-session/";
import { generateRandomId } from "@/app/libs/session-manager";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('[socket] is already running')
  } else {
    console.log('[socket] initializing ...')
    const io = new Server(res.socket.server, {
      /*addTrailingSlash: false,*/
      path: "/api/socket"
    })
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log("[socket] connected");
      socket.on('request', (msg: any) => {
        console.dir(msg);
        // handleRequestMessage(socket, msg);
      })
      socket.on('disconnect', () => {
        const ck = req.cookies;
        console.log("[socket] disconnected");
        console.dir(ck);
      });
    })
  }
  res.end()
}

export default SocketHandler
