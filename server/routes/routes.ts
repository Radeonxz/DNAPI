import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import eventRouter from "./event.route.ts";
import applicationRouter from "./application.route.ts";
import userRouter from "./user.route.ts";

const appRouter: Router = new Router();

appRouter.get("/", (ctx: any) => {
  ctx.response.body = "index route";
});

appRouter.use(
  "/application",
  applicationRouter.routes(),
  applicationRouter.allowedMethods()
);
appRouter.use("/event", eventRouter.routes(), eventRouter.allowedMethods());
appRouter.use("/user", userRouter.routes(), userRouter.allowedMethods());

export default appRouter;
