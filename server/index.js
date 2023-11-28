import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next);
  });

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      // const { render } = await vite.ssrLoadModule(path.resolve(__dirname, "../index.html"),);
      const { render } = await vite.ssrLoadModule(
        path.resolve(__dirname, "../src/entry-server")
      );

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()

      const appHtml = await render(req);

      console.log("render", appHtml.html);
      // 5. Inject the app-rendered HTML into the template.
      const headHtml = `
        ${appHtml.helmet.title.toString()}
        ${appHtml.helmet.meta.toString()}
        ${appHtml.helmet.link.toString()}
      `;
      let html = template
        .replace(`<!--ssr-outlet-->`, appHtml.html)
        .replace(`<!--app-head-->`, headHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
}

createServer();
