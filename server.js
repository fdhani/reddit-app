import express from "express";
import { debug } from "console";
import rendererMiddleware from "./server/middlewares/renderer.js";
const isProduction = process.env.NODE_ENV === "production";
const BASE = process.env.BASE || "/";
const PORT = process.env.PORT || 3000;

async function createServer() {
  const app = express();

  let vite;

  if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      BASE,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(BASE, sirv("./dist/client", { extensions: [] }));
  }

  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next);
    req.vite = vite;
  });

  app.use("*", rendererMiddleware);

  app.listen(PORT, () => {
    debug(`the server-side renderer, running at http://localhost:${PORT}`);
  });
}

createServer();
