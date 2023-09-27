import { randomBytes } from "crypto";
import { Dict } from "./datatypes";

export interface SessionData {
  createdDate: number;
  refreshedDate: number;
  maxAge: number;
}

class SessionManager {
  idDict: Dict<SessionData>;
  maxAge: number; // in seconds
  constructor(
    maxAge?: number
  ) {
    this.idDict = {};
    this.maxAge = maxAge ?? 7200; // 3 days
  }

  has_id(id: string): boolean {
    return id in this.idDict;
  }
  add_id(id: string) {
    const now = Date.now();
    this.idDict[id] = {
      createdDate: now,
      refreshedDate: now,
      maxAge: this.maxAge
    };
  }
  remove_id(id: string) {
    if (id in this.idDict) {
      delete this.idDict[id];
    }
    return id;
  }
  refresh_id(id: string): SessionData | undefined {
    if (id in this.idDict) {
      this.idDict[id].refreshedDate = Date.now();
      return this.idDict[id];
    }
    return;
  }
}

const sessionMgr = new SessionManager();
export const getSessionManager = () => (
  sessionMgr
);

export const generateRandomId = () => (
  randomBytes(16).toString("hex")
);

