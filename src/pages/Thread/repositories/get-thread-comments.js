const getThreadComments = async (subreddit, articleId) => {
  const res = await fetch(
    `https://www.reddit.com/r/${subreddit}/comments/${articleId}.json`
  );

  const data = await res.json();

  return {
    data,
  };
};

export default getThreadComments;
