import { getIronSession, createResponse } from "iron-session";

export interface CookieSessionData {
  id: string;
}

export const getSession = (req: Request, res: Response) => {
  const password = process.env.SESSION_PASSWORD??"ThisIsATemporaryPasswordPleaseConsiderToChangeIt";
  const session = getIronSession<CookieSessionData>(req, res, {
    password,
    cookieName: "session",
    cookieOptions: {
      secure: false,
    },
  });

  return session;
};

export { createResponse };