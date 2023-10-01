'use client'
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getSessionStore } from "./dataprovider/session-store";
import { SESSION_ID } from "./dataprovider/datatypes";

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

  
  useEffect(() => {
    return () => {
    };
  });
  function handleChange() {
  }

  return (
    <input onChange={handleChange} />
  )
}
