'use client'
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getSessionStore } from "./dataprovider/session-store";

let socket: any | undefined;

const handleResponseMessage = (socket: any, message: {name: string, value?: any}) => {
  switch(message.name) {
    case "generate-id":
      {
        const id = message.value;
        if (!id) {
          return;
        }
        const sessionStore = getSessionStore();
        sessionStore.sessionId = id;
      }
      break;
    default:
      break;
  }
};

export default function SessionWidget() {

  async function initialize_socket() {
    await fetch('/api/socket');
    socket = io({
      path: '/api/socket'
    });
    socket.on('connect', () => {
      console.log('[socket] connected');
      socket.emit('request', {
        name: 'generate-id'
      });
      socket.on('response', (msg:any) => (
        console.dir(msg)
      ));
    });
  }
  useEffect(() => {
    initialize_socket();

    return () => {
      const sessionStore = getSessionStore();
      const id = sessionStore.sessionId;
      socket.emit('request', {name: "destroy-id", value: id});
      socket?.close();
    };
  });
  function handleChange() {
  }

  return (
    <input onChange={handleChange} />
  )
}
