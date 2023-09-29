
class SessionStore {
  _sessionId?: string;
  constructor() {
  }
  set sessionId(id: string|undefined) {
    this._sessionId = id;
  }
  get sessionId() {
    return this._sessionId;
  }
}

let sessionStore: SessionStore | undefined;
export const getSessionStore = () => {
  if (!sessionStore) {
    sessionStore = new SessionStore();
  }
  return sessionStore;
};
