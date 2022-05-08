import {
  Router,
  Status,
  helpers
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import {
  createApplication,
  updateApplicationById,
  findApplicationById,
  deleteApplicationById
} from "../controllers/controllers.ts";

const applicationRouter: Router = new Router();

applicationRouter.post("/", async (ctx: any) => {
  try {
    const applicationData = await ctx.request.body().value;
    const applicationId = await createApplication(applicationData);
    ctx.response.body = { ...applicationData, applicationId };
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
  }
});

applicationRouter.put("/:applicationId", async (ctx: any) => {
  try {
    const { applicationId } = helpers.getQuery(ctx, { mergeParams: true });
    const applicationData = await ctx.request.body().value;
    const application = await updateApplicationById(
      applicationId,
      applicationData
    );
    ctx.response.body = { ...application };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

applicationRouter.get("/:applicationId", async (ctx: any) => {
  try {
    const { applicationId } = helpers.getQuery(ctx, { mergeParams: true });
    const application = await findApplicationById(applicationId);
    const applicationObj = { ...application };
    delete applicationObj["_id"];
    ctx.response.body = { ...applicationObj };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

applicationRouter.delete("/:applicationId", async (ctx: any) => {
  try {
    const { applicationId } = helpers.getQuery(ctx, { mergeParams: true });
    const deleteCount = await deleteApplicationById(applicationId);
    ctx.response.body = { deleteCount };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

export default applicationRouter;
