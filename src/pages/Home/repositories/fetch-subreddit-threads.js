const fetchSubredditThreads = async (
  subreddit,
  { after = "", filter } = {}
) => {
  let url = `https://www.reddit.com/r/${subreddit}.json?after=${after}`;

  if (filter) {
    url = `https://www.reddit.com/r/${subreddit}/${filter}.json?after=${after}`;
  }
  const res = await fetch(url);

  const data = await res.json();

  return { list: data?.data?.children || [], after: data?.data?.after };
};

export default fetchSubredditThreads;
