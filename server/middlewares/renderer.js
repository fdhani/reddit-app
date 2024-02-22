import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const isProduction = process.env.NODE_ENV === "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cached production assets
const templateHtml = isProduction
  ? fs.readFileSync("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? fs.readFileSync("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

const rendererMiddleware = async (req, res, next) => {
  const url = req.originalUrl;
  const vite = req.vite;

  try {
    let template;
    let render;

    if (!isProduction) {
      // Always read fresh template in development
      template = fs.readFileSync(
        path.resolve(__dirname, "../../index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);
      render = (
        await vite.ssrLoadModule(
          path.resolve(__dirname, "../../src/entry-server")
        )
      ).render;
    } else {
      template = templateHtml;
      render = (await import("../../src/entry-server.jsx")).render;
    }

    const appHtml = await render(req, ssrManifest);

    const headHtml = `
        ${appHtml.helmet.title.toString()}
        ${appHtml.helmet.meta.toString()}
        ${appHtml.helmet.link.toString()}
      `;

    let html = template
      .replace(`<!--ssr-outlet-->`, appHtml.html)
      .replace(`<!--app-head-->`, headHtml);

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite.ssrFixStacktrace(e);
    next(e);
  }
};

export default rendererMiddleware;
