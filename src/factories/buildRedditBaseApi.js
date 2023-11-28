import { REDDIT_API_DOMAIN } from "../constants/url";

const contructRedditBaseApi = () => {
  //@TODO: move to .env
  const CLIENT_ID = "VKHRkGWFfPI2QYhDrkKAwsjH3x968A";
  const SCOPE = "identity read";
  const DURATION = "temporary";
  const REDIRECT_URI = "http://localhost:5173/";
  const RANDOM_STRING = "test-string";

  return `${REDDIT_API_DOMAIN}?client_id=${CLIENT_ID}&response_type=TYPE&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;
};

export default contructRedditBaseApi;
