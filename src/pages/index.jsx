import Home from "./Home";
import homeLoader from "./Home/loaders";

import Thread from "./Thread";
import threadLoader from "./Thread/loader";

const Routes = [
  {
    path: "r/:subreddit/:filter?",
    loader: homeLoader,
    Component: Home,
  },
  {
    path: "r/:subreddit/comments/:threadid",
    loader: threadLoader,
    Component: Thread,
  },
];

export default Routes;
