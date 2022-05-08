import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import db from "../db/mongodb.ts";

interface ApplicationSchema {
  _id: Bson.ObjectId;
  appId: string;
  appName: string;
  appURL: string;
  description: string;
  createdAt: Date;
}

const ApplicationModel = db.collection<ApplicationSchema>("applications");

export { ApplicationModel };
