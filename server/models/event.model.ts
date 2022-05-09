import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import db from "../db/mongodb.ts";

interface EventSchema {
  _id: Bson.ObjectId;
  eventId: string;
  eventName: string;
  appId: string;
  path: string;
  host: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventModel = db.collection<EventSchema>("events");

export { EventModel };
