export const REDDIT_API_DOMAIN = "https://www.reddit.com/api/v1/authorize";

const authorize = () => {
  //@TODO: move to .env
  const CLIENT_ID = "VEpf0WIRmkaT_UMRdqMe_w";
  const SCOPE = "identity read";
  const DURATION = "temporary";
  const REDIRECT_URI = "http://localhost:5173";
  const RANDOM_STRING = "test-string";
  const RESPONSE_TYPE = "code";

  const url = `${REDDIT_API_DOMAIN}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

  window.open(url);
};

export default authorize;
