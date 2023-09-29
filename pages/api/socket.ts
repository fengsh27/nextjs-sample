

import { Server } from 'socket.io'
// import { withIronSessionApiRoute } from "iron-session/";
import { getSessionManager, generateRandomId } from "@/app/libs/session-manager";

const handleRequestMessage = (socket: any, message: {name: string, value?: any}) => {
  switch (message.name) {
    case "generate-id":
      {
        const id = generateRandomId();
        const sessionMgr = getSessionManager();
        sessionMgr.add_id(id);
        socket.emit('response', {name: message.name, value: id});
      }
      break;
    case "destroy-id":
      {
        const id = message.value;
        if (!id) {
          return;
        }
        const sessionMgr = getSessionManager();
        sessionMgr.remove_id(id);
      }
      break;
    default:
      break;
  }
};

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
        handleRequestMessage(socket, msg);
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
