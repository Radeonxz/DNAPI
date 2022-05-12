import {
  Router,
  Status,
  helpers
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import {
  createEvent,
  updateEventById,
  getAllEventsByAppId,
  findEventById,
  deleteEventById
} from "../controllers/controllers.ts";

const eventRouter: Router = new Router();

eventRouter.post("/", async (ctx: any) => {
  try {
    const eventData = await ctx.request.body().value;
    const host = ctx.request.ip;
    const eventId = await createEvent({ ...eventData, host });
    ctx.response.body = { ...eventData, eventId };
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
  }
});

eventRouter.put("/:eventId", async (ctx: any) => {
  try {
    const { eventId } = helpers.getQuery(ctx, { mergeParams: true });
    const eventData = await ctx.request.body().value;
    const event = await updateEventById(eventId, eventData);
    ctx.response.body = { ...event };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

eventRouter.get("/all/:appId", async (ctx: any) => {
  try {
    const { appId } = helpers.getQuery(ctx, { mergeParams: true });
    const events = await getAllEventsByAppId(appId);
    ctx.response.body = events;
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

eventRouter.get("/:eventId", async (ctx: any) => {
  try {
    const { eventId } = helpers.getQuery(ctx, { mergeParams: true });
    const event = await findEventById(eventId);
    const eventObj = { ...event };
    delete eventObj["_id"];
    ctx.response.body = { ...eventObj };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

eventRouter.delete("/:eventId", async (ctx: any) => {
  try {
    const { eventId } = helpers.getQuery(ctx, { mergeParams: true });
    const deleteCount = await deleteEventById(eventId);
    ctx.response.body = { deleteCount };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

export default eventRouter;
