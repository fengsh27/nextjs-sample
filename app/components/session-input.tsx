'use client'
import { useEffect } from "react";
import { io } from "socket.io-client";

let socket: any | undefined;

export default function SessionInput() {

  async function initialize_socket() {
    await fetch('/api/socket');
    socket = io({
      path: '/api/socket'
    });
    socket.on('connect', () => {
      console.log('[socket] connected');
    });
  }
  useEffect(() => {
    initialize_socket();

    return () => (
      socket?.close()
    );
  });
  function handleChange() {
    fetch('/api/allRecords')
  }

  return (
    <input onChange={handleChange} />
  )
}
