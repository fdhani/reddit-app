import fetchSubredditDetail from "../repositories/fetch-subreddit-detail";
import fetchSubredditPosts from "../repositories/fetch-subreddit-threads";

const loader = async ({ params }) => {
  const [details, threads] = await Promise.all([
    fetchSubredditDetail(params.subreddit),
    fetchSubredditPosts(params.subreddit, { filter: params.filter }),
  ]);

  return {
    details,
    threads,
  };
};

export default loader;
