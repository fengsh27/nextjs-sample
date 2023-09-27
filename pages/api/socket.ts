import { Server } from 'socket.io'

const SocketHandler = (req: any, res: any/*NextApiResponseWithSocket*/) => {
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
