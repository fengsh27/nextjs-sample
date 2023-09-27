

import { Server } from 'socket.io'
// import { withIronSessionApiRoute } from "iron-session/";
import { getSessionManager } from "@/app/libs/session-manager";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('[socket] is already running')
  } else {
    console.log('[socket] initializing ...')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log("[socket] connected");
      socket.on('input-change', msg => {
        socket.broadcast.emit('[socket] update-input', msg)
      })
      socket.on('disconnect', () => {
        console.log('[socket] disconnected');
      });
    })
  }
  res.end()
}

export default SocketHandler
