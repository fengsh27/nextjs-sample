import { randomBytes } from "crypto";
import { Dict } from "./datatypes";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";


export interface SessionData {
  createdDate: number;
  refreshedDate: number;
  maxAge: number;
}

export class SessionManager {
  maxAge: number; // in seconds
  db: any;
  dbFile: string;
  tableName: string;
  getStmt: any | undefined;
  insertStmt: any | undefined;
  constructor(
    dbFile?: string,
    tableName?: string,
    maxAge?: number
  ) {
    this.maxAge = maxAge ?? 7200; // 3 days
    this.dbFile = dbFile ?? "./tmp/sessions.db";
    this.tableName = tableName ?? "sessions"
  }

  async initialize() {
    await this._initialize_session_db();
  }

  async _initialize_session_db() {
    try {
      this.db = await open({
        filename: this.dbFile,
        driver: sqlite3.Database
      });
      await this.db.exec(`create table if not exists ${this.tableName} (id text primary key, createdDate integer, refreshedDate integer, maxAge number);`);
      this.getStmt = await this.db.prepare(`select * from ${this.tableName} where id = ?`);
    } catch (e: any) {
      console.log(e);
    }
  }

  async has_id(id: string): Promise<boolean> {
    try {
      // const result = await this.db.get(`select id from ${this.tableName} where id = ?`, id);
      const result = await this.getStmt.get(id);
      return result !== undefined;
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }
  async add_id(id: string) {
    const now = Date.now();
    try {
      await this.db.run(
        `insert into ${this.tableName} (id, createdDate, refreshedDate, maxAge) values (:id, :cr, :ref, :max);`, {
        ":id": id, 
        ":cr": now, 
        ":ref": now, 
        ":max": this.maxAge
      });
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }
  async remove_id(id: string) {
    try {
      await this.db.run(`delete from ${this.tableName} where id=:id`, {":id": id});
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }
  async refresh_id(id: string) {
    const now = Date.now();
    console.log(`refreshed at: ${now}`);
    try {
      await this.db.run(`update ${this.tableName} set refreshedDate = ? where id = ?`, now, id);
      // await this.db.
    } catch (e: any) {
      console.log(e);
      throw e;
    }    
  }
  async get_session(id: string): Promise<SessionData> {
    try {
      // const result = await this.db.get(`select * from ${this.tableName} where id = ?;`, id);
      // this.getStmt.bind({id});
      const result = await this.getStmt.get(id);
      return result;
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }

  // for test
  drop_database() {
    fs.unlinkSync(this.dbFile);
  }
  delete_table() {
    this.db.exec(`drop table if exists ${this.tableName}`);
  }
}

let sessionMgr: SessionManager | undefined;
export const getSessionManager = (dbFile?: string, tableName?: string) => {
  if (sessionMgr === undefined) {
    const fn = dbFile ?? process.env.SQLITE_DATABASE;
    const tn = tableName ?? process.env.SQLITE_TABLE;
    sessionMgr = new SessionManager(fn, tn);
  }
  return sessionMgr;
};

export const generateRandomId = () => (
  randomBytes(16).toString("hex")
);

