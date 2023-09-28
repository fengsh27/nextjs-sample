
import { getSessionManager, SessionManager } from "../session-manager";

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe("SessionManager", () => {
  let db: SessionManager | undefined;
  beforeEach(async () => {
    db = getSessionManager("./temp.db", "sessiontemp");
    await db.initialize();
  });
  afterEach(() => {
    db?.drop_database();
  });
  it("should test create table", async () => {
    const exists = await db?.has_id("1");
    expect(exists).toBeFalsy();
  });
  it("should test insert sessions", async () => {
    await db?.add_id("123");
    const exists = await db?.has_id('123');
    expect(exists).toBeTruthy();
  });
  it("should test remove id", async () => {
    await db?.add_id("123");
    let exists = await db?.has_id('123');
    expect(exists);
    await db?.remove_id('123');
    exists = await db?.has_id('123');
    expect(exists).toBeFalsy();
  });
  it ("should test refresh session", async () => {
    await db!.add_id("123");
    const exists = await db?.has_id('123');
    const now = Date.now();
    expect(exists);
    await db!.refresh_id("123");
    const result = await db!.get_session("123");
    console.dir(result);
    expect(result.refreshedDate).toBeGreaterThan(now);
  });
});

