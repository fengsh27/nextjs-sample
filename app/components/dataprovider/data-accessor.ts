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
  try {
    const respose = await axios.get('/api/sessionId');
    return respose;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};

export const getHistory = async() => {
  try {
    const id = await getSessionId();
    const response = await axios.get('/api/history', {
      headers: {
        Authorization: id,
      }
    });
    return response;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};
