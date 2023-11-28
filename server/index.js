import express from "express";
import { createServer as createViteServer } from "vite";
import { debug } from "console";
import rendererMiddleware from "./middlewares/renderer.js";

const PORT = 3000;

async function createServer() {
  const app = express();

  const viteServer = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use((req, res, next) => {
    viteServer.middlewares.handle(req, res, next);
    req.vite = viteServer;
  });

  app.use("*", rendererMiddleware);

  app.listen(PORT, () => {
    debug(`the server-side renderer, running at http://localhost:${PORT}`);
  });
}

createServer();
