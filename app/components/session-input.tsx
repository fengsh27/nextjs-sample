'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SESSION_ID } from "./dataprovider/datatypes";
import { getHistory } from "./dataprovider/data-accessor";

let socket: any | undefined;

export default function SessionWidget() {
  const [history, setHistory] = useState<string>("");
  useEffect(() => {
    getHistory().then((response) => {
      console.dir(response)
    });
    return () => {
    };
  });
  function handleChange(value:any) {
    setHistory(value);
  }

  return (
    <input onChange={handleChange} value={history} />
  )
}
