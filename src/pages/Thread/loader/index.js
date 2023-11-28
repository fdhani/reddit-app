import getThreadComments from "../repositories/get-thread-comments";
import canUseDOM from "../../../utils/canUseDom";
import { defer } from "react-router-dom";

const loader = async ({ params }) => {
  if (canUseDOM) {
    return defer({
      comments: getThreadComments(params.subreddit, params.threadid),
    });
  } else {
    return {
      comments: await getThreadComments(params.subreddit, params.threadid),
    };
  }
};

export default loader;
