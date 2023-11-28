const fetchSubredditDetail = async (subreddit) => {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);

  const data = await res.json();

  return {
    subRedditName: data?.data?.display_name_prefixed || [],
  };
};

export default fetchSubredditDetail;
