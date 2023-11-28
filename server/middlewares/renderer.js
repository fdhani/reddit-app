import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rendererMiddleware = async (req, res, next) => {
  const url = req.originalUrl;
  const vite = req.vite;

  try {
    let template = fs.readFileSync(
      path.resolve(__dirname, "../../index.html"),
      "utf-8"
    );

    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule(
      path.resolve(__dirname, "../../src/entry-server")
    );

    const appHtml = await render(req);

    const headHtml = `
        ${appHtml.helmet.title.toString()}
        ${appHtml.helmet.meta.toString()}
        ${appHtml.helmet.link.toString()}
      `;

    let html = template
      .replace(`<!--ssr-outlet-->`, appHtml.html)
      .replace(`<!--app-head-->`, headHtml);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    vite.ssrFixStacktrace(e);
    next(e);
  }
};

export default rendererMiddleware;
