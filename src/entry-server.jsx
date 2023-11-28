import React from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import ReactDOMServer from "react-dom/server";

import Routes from "./pages";

const createFetchRequest = (req) => {
  let origin = `${req.protocol}://${req.get("host")}`;
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
};

export async function render(req) {
  const helmetContext = {};
  let { dataRoutes, query } = createStaticHandler(Routes);
  let fetchRequest = createFetchRequest(req);

  console.log("HelmetProvider", HelmetProvider);

  let context = await query(fetchRequest);
  const router = createStaticRouter(dataRoutes, context);

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouterProvider router={router} context={context} />
      </HelmetProvider>
    </React.StrictMode>
  );

  return { html, helmet: helmetContext?.helmet };
}
