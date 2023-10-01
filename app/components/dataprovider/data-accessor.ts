import axios from "axios";
import { SESSION_ID } from "./datatypes";

export const getSessionId = async () => {
  const the_id = sessionStorage.getItem(SESSION_ID);
  if (the_id === null) {
    const {data: {id}} = await requestSessionId();
    sessionStorage.setItem(SESSION_ID, id);
    console.log(`requested session id: ${id}`);

    return id;
  }
  console.log(`get session id: ${the_id}`);
  return the_id;
};
export const requestSessionId = async () => {
  const respose = await axios.get('/api/sessionId');
  return respose;
};

export const getHistory = async() => {
  const id = await getSessionId();
  const response = await axios.get('/api/history', {
    headers: {
      Authorization: ""
    }
  })
};
